<script setup lang="ts">
import Badge from '@nuxt/ui/components/Badge.vue';
import { cn } from '@/lib/utils';

interface Props {
  heading?: string;
  subheading?: string;
  count?: number;
  badge?: string;
  badgeColor?: string;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-liftoff-kanban-column-header
    :class="cn(
      'p-2 flex flex-col',
      props.class
    )"
  >
    <div class="flex items-center justify-between min-h-8">
      <div class="px-3 flex items-center gap-1.5">
        <slot />

        <h3
          v-if="props.heading || $slots.heading"
          class="text-sm font-medium text-zinc-800 dark:text-white"
        >
          <slot name="heading">{{ props.heading }}</slot>
        </h3>

        <span
          v-if="props.count !== undefined"
          class="text-sm text-zinc-500 dark:text-white/70"
        >
          {{ props.count }}
        </span>

        <Badge
          v-if="props.badge"
          :label="props.badge"
          :color="props.badgeColor"
          size="sm"
        />
      </div>

      <div v-if="$slots.actions" class="flex items-center gap-1">
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="props.subheading || $slots.subheading"
      class="px-3 flex items-center gap-1.5 mb-1"
    >
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        <slot name="subheading">{{ props.subheading }}</slot>
      </p>
    </div>
  </div>
</template>
