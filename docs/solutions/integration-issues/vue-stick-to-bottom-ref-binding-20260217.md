---
date: 2026-02-17
problem_type: integration
component: ai/chat-conversation
severity: moderate
symptoms:
  - "error TS6133: 'scrollRef' is declared but its value is never read"
  - "error TS6133: 'contentRef' is declared but its value is never read"
  - "error TS2322: Type 'Ref<boolean | undefined>' is not assignable to type 'Ref<boolean>'"
root_cause: vue-stick-to-bottom composable returns mutable refs that need function-style template binding, and isAtBottom is typed as boolean | undefined
tags: [vue-stick-to-bottom, template-refs, provide-inject, typescript]
---

# vue-stick-to-bottom ref binding and isAtBottom type

## Symptom

After destructuring `useStickToBottom()` and using `ref="scrollRef"` in the template, TypeScript reports `scrollRef` and `contentRef` as unused. Additionally, `isAtBottom` cannot be provided as `Ref<boolean>` because it's typed as `Ref<boolean | undefined>`.

## Investigation

1. Attempted: `ref="scrollRef"` in template (standard Vue template ref syntax)
   Result: Creates a *new* Vue template ref named `scrollRef` in the component scope, shadowing the composable's returned ref. The composable's ref stays unbound.

## Root Cause

`useStickToBottom()` returns `scrollRef` and `contentRef` as mutable `Ref` objects that need to be assigned DOM elements directly. Vue's `ref="name"` syntax creates new template refs -- it doesn't bind to existing refs from composables. The composable needs the refs assigned via function-style `:ref` binding.

`isAtBottom` is typed as `Ref<boolean | undefined>` because the scroll state is initially unknown before the DOM mounts.

## Solution

Use function-style `:ref` binding and wrap `isAtBottom` in a computed with a default:

```vue
<!-- Before (broken) -->
<script setup>
const { scrollRef, contentRef, isAtBottom, scrollToBottom } = useStickToBottom()

provide(key, { isAtBottom, scrollToBottom }) // TS error: boolean | undefined
</script>

<template>
  <div ref="scrollRef">           <!-- Creates NEW ref, doesn't bind composable's -->
    <div ref="contentRef">
      <slot />
    </div>
  </div>
</template>

<!-- After (fixed) -->
<script setup>
const { scrollRef, contentRef, isAtBottom, scrollToBottom } = useStickToBottom()

const isAtBottomSafe = computed(() => isAtBottom.value ?? true)

provide(key, { isAtBottom: isAtBottomSafe, scrollToBottom })
</script>

<template>
  <div :ref="(el) => { scrollRef = el as HTMLElement }">
    <div :ref="(el) => { contentRef = el as HTMLElement }">
      <slot />
    </div>
  </div>
</template>
```

## Prevention

- When a composable returns refs meant to be bound to DOM elements, always use function-style `:ref` binding
- When wrapping external composable refs in provide/inject, check for `undefined` in the type and provide a sensible default via `computed`
