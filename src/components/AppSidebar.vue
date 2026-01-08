<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import AppLogo from './AppLogo.vue';

import { inject, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import type { SharedData } from '@/types';

const page = usePage<SharedData>();

const sidebar = inject<{
  isOpen: { value: boolean };
  isMobile: { value: boolean };
}>('sidebar');

const isCollapsed = computed(() => !sidebar?.isOpen.value);
</script>

<template>
  <aside
    class="flex h-screen flex-col border-r bg-background transition-all duration-300"
    :class="isCollapsed ? 'w-16' : 'w-64'"
  >
    <!-- Header -->
    <div class="flex h-16 items-center border-b px-4">
      <Link
        :href="page.props?.navigation?.app?.default ?? '/dashboard'"
        class="flex items-center gap-2"
        aria-label="Go to dashboard"
      >
        <AppLogo :collapsed="isCollapsed" />
      </Link>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto py-4">
      <NavMain
        :items="page.props?.navigation?.app?.main?.items ?? []"
        :collapsed="isCollapsed"
      />
    </div>

    <!-- Footer -->
    <div class="border-t py-4">
      <NavFooter
        :items="page.props?.navigation?.app?.footer?.items ?? []"
        :collapsed="isCollapsed"
      />
      <NavUser :collapsed="isCollapsed" />
    </div>
  </aside>

  <slot />
</template>
