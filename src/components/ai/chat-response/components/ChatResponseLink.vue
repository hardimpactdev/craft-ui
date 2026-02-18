<script setup lang="ts">
defineProps<{
  href: string
  title?: string
}>()
</script>

<template>
  <a
    :href="href"
    :title="title"
    target="_blank"
    rel="noopener noreferrer"
    class="underline underline-offset-4 text-primary hover:text-primary/80 transition-colors"
  >
    <slot />
  </a>
</template>
