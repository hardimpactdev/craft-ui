<script setup lang="ts">
defineProps<{
  href: string
  title?: string
  text: string
}>()
</script>

<template>
  <img
    :src="href"
    :alt="text"
    :title="title"
    class="my-4 max-w-full rounded-lg"
  />
</template>
