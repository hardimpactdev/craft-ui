---
date: 2026-02-13
problem_type: integration
component: CI/CD (GitHub Actions → npm)
severity: critical
symptoms:
  - "npm versions stuck at 0.0.17 despite auto-releases creating tags v0.0.18–v0.0.21"
  - "No 'Publish package to npm' workflow runs for auto-released versions"
  - "npm error You cannot publish over the previously published versions: 0.0.17"
root_cause: Two stacked issues — GITHUB_TOKEN events don't trigger other workflows, and auto-release doesn't bump package.json version
tags: [github-actions, npm, oidc, trusted-publishing, auto-release, GITHUB_TOKEN]
---

# Auto-released versions not publishing to npm

## Symptom

After adding an auto-release job to `ci.yml`, new versions stopped appearing on npm. GitHub releases (v0.0.18–v0.0.21) were created successfully, but no corresponding "Publish package to npm" workflow runs appeared. npm stayed at 0.0.17.

## Investigation

1. Attempted: Checking OIDC/trusted publishing config
   Result: OIDC setup was correct — `id-token: write`, `registry-url`, `--provenance` all present.

2. Checked `gh run list` — no publish workflow runs after v0.0.17.
   The auto-release job was added on Jan 23 (commit `4fcac39`), and that's exactly when publishes stopped.

3. After fixing issue 1, publish ran but failed with:
   `npm error You cannot publish over the previously published versions: 0.0.17`
   The publish was trying to publish version from `package.json` (0.0.17) instead of the tag version.

## Root Cause

**Two stacked issues:**

### Issue 1: GITHUB_TOKEN doesn't trigger downstream workflows

GitHub Actions events created with `GITHUB_TOKEN` intentionally do NOT trigger other workflows (to prevent recursive loops). The auto-release job used `GITHUB_TOKEN` to create the GitHub release, so `publish.yml` (triggered by `release: [published]`) never fired.

### Issue 2: Auto-release doesn't bump package.json version

The auto-release job creates git tags (v0.0.18, v0.0.19, etc.) but never updates the `version` field in `package.json`. npm reads the version from `package.json`, not the git tag — so it tried to publish 0.0.17 again.

## Solution

### Fix 1: Use a PAT for auto-release (`ci.yml`)

```yaml
# Before (broken) — GITHUB_TOKEN events don't trigger other workflows
      - name: Create and push tag
        run: |
          git tag ${{ steps.next_version.outputs.version }}
          git push origin ${{ steps.next_version.outputs.version }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ steps.next_version.outputs.version }}
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# After (fixed) — PAT events DO trigger other workflows
      - name: Create and push tag
        run: |
          git tag ${{ steps.next_version.outputs.version }}
          git push origin ${{ steps.next_version.outputs.version }}
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_TOKEN }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ steps.next_version.outputs.version }}
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.RELEASE_TOKEN }}
```

`RELEASE_TOKEN` is a fine-grained PAT with `contents: write` scope for the repo.

### Fix 2: Set version from tag before publishing (`publish.yml`)

```yaml
# Added before bun install / build
      - name: Set version from release tag
        run: npm version "${GITHUB_REF_NAME#v}" --no-git-tag-version
```

This strips the `v` prefix from the tag (e.g. `v0.0.22` → `0.0.22`) and sets it in `package.json` before building. `--no-git-tag-version` prevents npm from creating another git tag.

## Prevention

- When chaining workflows (one workflow triggers another), always check if the originating event uses `GITHUB_TOKEN` — if so, downstream workflows won't fire.
- When auto-tagging releases, ensure the version in `package.json` is synced from the tag before publishing.
- After setting up CI chains, do a full end-to-end test: push → CI → release → publish → verify on npm.

## Related

- [GitHub docs: Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#triggering-a-workflow-from-a-workflow) — documents the GITHUB_TOKEN limitation
- [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) — OIDC setup (this part was correct)
