<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  gap?: string;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 'gap-4',
});
</script>

<template>
  <div
    data-liftoff-kanban
    :class="cn(
      'flex overflow-x-auto pb-4',
      props.gap,
      props.class
    )"
  >
    <slot />
  </div>
</template>
