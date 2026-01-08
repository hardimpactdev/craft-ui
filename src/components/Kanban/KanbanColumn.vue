<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  id: string | number;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-liftoff-kanban-column
    :data-column-id="props.id"
    :class="cn(
      'flex flex-col rounded-lg w-80 min-w-80 max-w-80',
      'bg-zinc-100 dark:bg-zinc-800',
      props.class
    )"
  >
    <slot />
  </div>
</template>
