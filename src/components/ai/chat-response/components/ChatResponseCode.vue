<script setup lang="ts">
defineProps<{
  lang?: string
  text: string
}>()
</script>

<template>
  <pre class="my-4 rounded-lg bg-muted p-4 overflow-x-auto"><code :class="lang ? `language-${lang}` : undefined" class="text-sm font-mono">{{ text }}</code></pre>
</template>
