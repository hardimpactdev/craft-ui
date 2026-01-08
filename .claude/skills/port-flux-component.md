# Port Flux Component to Vue

Use this skill when porting a Flux UI Pro component to the Liftoff Vue library.

## Flux Pro Source Location

**ALWAYS** check the Flux Pro source code directly:
```
/Users/nckrtl/Projects/flux/vendor/livewire/flux-pro/stubs/resources/views/flux/
```

For base Flux components (non-Pro):
```
/Users/nckrtl/Projects/flux/vendor/livewire/flux/stubs/resources/views/flux/
```

## Porting Workflow

1. **Read Flux source files** - Always start by reading the Blade templates
2. **Extract props and slots** - Map Livewire props/slots to Vue equivalents
3. **Copy CSS classes exactly** - Use the same Tailwind classes from Flux
4. **Create Vue component** - Follow existing Liftoff component patterns
5. **Create Storybook story** - Add stories with realistic data
6. **Export from index.ts** - Add component exports

## Key Styling Patterns

### Flux Heading Component Default
The Flux `<flux:heading>` component uses these defaults:
- **Default size**: `text-sm font-medium`
- **Color**: `text-zinc-800 dark:text-white`

Always use `text-sm font-medium` for headings in cards, headers, etc. unless a different size prop is specified.

### Common Flux Classes

| Element | Classes |
|---------|---------|
| Card | `rounded-lg shadow-xs ring-1 ring-black/[0.07] dark:ring-zinc-700 p-3 bg-white dark:bg-zinc-700` |
| Column | `rounded-lg w-80 max-w-80 bg-zinc-100 dark:bg-zinc-800` |
| Container padding | `p-2`, `px-2`, `px-3` |
| Gap between items | `gap-2`, `gap-1.5` |
| Text muted | `text-zinc-500 dark:text-zinc-400` or `dark:text-white/70` |

### Shadow Pattern
- Light mode: `shadow-xs` (very subtle)
- Dark mode: No shadows (cleaner look)

### Ring/Border Pattern
- Light mode: `ring-1 ring-black/[0.07]` or `ring-zinc-200`
- Dark mode: `ring-zinc-700` or `ring-white/10`

## vue-draggable-plus Usage

When using `vue-draggable-plus` for drag-and-drop:

**WRONG** - Using slot:
```vue
<VueDraggable v-model="items">
  <template #item="{ element }">
    <div>{{ element }}</div>
  </template>
</VueDraggable>
```

**CORRECT** - Using v-for inside:
```vue
<VueDraggable v-model="items" class="flex flex-col gap-2">
  <div v-for="item in items" :key="item.id">
    <slot name="card" :card="item" />
  </div>
</VueDraggable>
```

## Overflow and Ring Clipping

When using `overflow-y-auto` on a container with children that have `ring-1`:
- Add `pt-0.5` (or similar small padding) to prevent the top ring from being clipped
- The ring renders outside the element bounds and gets cut by overflow

## File Structure Convention

```
src/components/
├── ComponentName/
│   ├── ComponentName.vue
│   ├── ComponentNamePart.vue
│   ├── index.ts
│   └── ComponentName.stories.ts
```

## Accessibility Considerations

When porting components, ensure they meet accessibility standards:

### Icon-only Buttons
```vue
<!-- Bad -->
<Button icon="i-lucide-plus" />

<!-- Good -->
<Button icon="i-lucide-plus" aria-label="Add item" />
```

### Color Contrast
Avoid colors with insufficient contrast against backgrounds:
- Green (`success`) and orange (`warning`) often fail WCAG on white backgrounds
- Prefer `primary` (zinc-800) and `secondary` for better contrast

### Interactive Elements
All clickable elements need accessible names:
```vue
<!-- Link with icon needs aria-label -->
<a href="/settings" aria-label="Settings">
  <Icon name="i-lucide-cog" />
</a>

<!-- Or use visually hidden text -->
<a href="/settings">
  <Icon name="i-lucide-cog" />
  <span class="sr-only">Settings</span>
</a>
```

## Checklist

- [ ] Read all Flux source files for the component
- [ ] Match CSS classes exactly (check source, don't guess)
- [ ] Use `text-sm font-medium` for headings (Flux default)
- [ ] Handle both light and dark mode
- [ ] Add `aria-label` to icon-only buttons/links
- [ ] Check color contrast for all variants
- [ ] Create Storybook stories with realistic data
- [ ] Add interaction tests to stories (see `/write-tests` skill)
- [ ] Add exports to `index.ts`
- [ ] Run `bun vitest --project=storybook --run` to verify tests pass
- [ ] Check Storybook Accessibility panel for violations
- [ ] Test in browser (use playwriter)
