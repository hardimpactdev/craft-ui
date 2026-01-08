<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

interface Props {
  id: string | number;
  heading?: string;
  as?: 'div' | 'button';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isButton = computed(() => props.as === 'button');

function handleClick(event: MouseEvent) {
  if (isButton.value) {
    emit('click', event);
  }
}
</script>

<template>
  <component
    :is="props.as"
    data-liftoff-kanban-card
    :data-card-id="props.id"
    :class="cn(
      'block w-full rounded-lg p-3 text-left',
      'bg-white dark:bg-zinc-700',
      'shadow-xs ring-1 ring-black/[0.07] dark:ring-zinc-700',
      isButton && [
        'cursor-default select-none',
        'hover:bg-zinc-50 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600',
      ],
      props.class
    )"
    @click="handleClick"
  >
    <!-- Header slot -->
    <div v-if="$slots.header" class="mb-2 flex items-center gap-1.5">
      <slot name="header" />
    </div>

    <!-- Heading -->
    <h4
      v-if="props.heading || $slots.heading"
      class="text-sm font-medium text-zinc-800 dark:text-white"
    >
      <slot name="heading">{{ props.heading }}</slot>
    </h4>

    <!-- Default content -->
    <div
      v-if="$slots.default"
      :class="[
        'text-sm text-zinc-600 dark:text-zinc-300',
        (props.heading || $slots.heading) && 'mt-1'
      ]"
    >
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="mt-2 flex items-center gap-1.5">
      <slot name="footer" />
    </div>
  </component>
</template>
