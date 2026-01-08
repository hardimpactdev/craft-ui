<script setup lang="ts">
import Button from '@nuxt/ui/components/Button.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { inject } from 'vue';
import type { BreadcrumbItemType } from '@/types';
import { Menu } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
  }>(),
  {
    breadcrumbs: () => [],
  }
);

const sidebar = inject<{
  toggle: () => void;
}>('sidebar');
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 border-b px-6 md:px-4"
  >
    <div class="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        class="-ml-1"
        @click="sidebar?.toggle()"
      >
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle sidebar</span>
      </Button>
      <template v-if="breadcrumbs && breadcrumbs.length > 0">
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </template>
    </div>
  </header>
</template>
