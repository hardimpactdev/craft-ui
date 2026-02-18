<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  ordered: boolean
  start: number | ""
  loose: boolean
}>()

const tag = computed(() => props.ordered ? "ol" : "ul")

const attrs = computed(() => {
  if (props.ordered && props.start !== 1 && props.start !== "") {
    return { start: props.start }
  }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="my-4 pl-6"
    :class="ordered ? 'list-decimal' : 'list-disc'"
  >
    <slot />
  </component>
</template>
