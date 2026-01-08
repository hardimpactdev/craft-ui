<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'header' | 'sidebar';
  class?: string;
}

const props = defineProps<Props>();
const className = computed(() => props.class);
</script>

<template>
  <main
    class="flex-1"
    :class="[
      variant === 'sidebar' ? 'flex flex-col overflow-hidden' : 'mx-auto flex h-full w-full max-w-7xl flex-col gap-4 rounded-xl overflow-auto',
      className
    ]"
  >
    <slot />
  </main>
</template>
