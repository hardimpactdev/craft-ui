<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span v-html="text" />
</template>
