<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-liftoff-kanban-column-footer
    :class="cn(
      'px-2 pb-2 flex flex-col gap-2',
      props.class
    )"
  >
    <slot />
  </div>
</template>
