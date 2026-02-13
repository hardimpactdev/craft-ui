<script setup lang="ts">
import type { NavItem } from '@/types';
import Icon from './Icon.vue';

interface Props {
  items: NavItem[];
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
});
</script>

<template>
  <nav class="space-y-1 px-2" aria-label="Footer navigation">
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      target="_blank"
      rel="noopener noreferrer"
      :title="collapsed ? item.title : undefined"
      :aria-label="collapsed ? item.title : undefined"
      class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      :class="[collapsed ? 'justify-center' : '']"
    >
      <Icon
        v-if="typeof item.icon === 'string'"
        :name="item.icon"
        class="size-5 shrink-0"
      />
      <component
        v-else-if="item.icon"
        :is="item.icon"
        class="size-5 shrink-0"
      />
      <span v-if="!collapsed">{{ item.title }}</span>
    </a>
  </nav>
</template>
