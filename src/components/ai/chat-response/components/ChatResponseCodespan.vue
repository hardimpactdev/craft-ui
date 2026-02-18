<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">{{ text }}</code>
</template>
