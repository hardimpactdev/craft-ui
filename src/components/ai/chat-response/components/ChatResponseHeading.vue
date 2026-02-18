<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  depth: number
}>()

const tag = computed(() => `h${props.depth}`)

const classes = computed(() => {
  switch (props.depth) {
    case 1: return "text-2xl font-semibold tracking-tight mt-6 mb-4 first:mt-0"
    case 2: return "text-xl font-semibold tracking-tight mt-5 mb-3 first:mt-0"
    case 3: return "text-lg font-semibold tracking-tight mt-4 mb-2 first:mt-0"
    case 4: return "text-base font-semibold tracking-tight mt-3 mb-2 first:mt-0"
    case 5: return "text-sm font-semibold tracking-tight mt-3 mb-1 first:mt-0"
    case 6: return "text-xs font-semibold tracking-tight mt-3 mb-1 first:mt-0"
    default: return "text-base font-semibold"
  }
})
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
