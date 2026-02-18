<script setup lang="ts">
import { useSlots } from "vue"

defineProps<{
  text: string
}>()

const slots = useSlots()
</script>

<template>
  <slot v-if="slots.default" />
  <template v-else>{{ text }}</template>
</template>
