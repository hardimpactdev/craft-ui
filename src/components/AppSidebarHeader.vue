<script setup lang="ts">
import { SidebarTrigger } from '@/components/sidebar';
import { Separator } from '@/components/separator';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import type { BreadcrumbItem } from '@/types';

defineProps<{
  breadcrumbs?: BreadcrumbItem[];
}>();
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <template v-if="breadcrumbs && breadcrumbs.length > 0">
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </template>
    </div>
  </header>
</template>
