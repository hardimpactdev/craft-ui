<script setup lang="ts">
import { provide, ref, inject } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { SharedData } from '@/types';

interface Props {
  variant?: 'header' | 'sidebar';
}

defineProps<Props>();

// Check if sidebar state is already provided (e.g., from Storybook)
const existingSidebar = inject<{ isOpen: { value: boolean } } | null>('sidebar', null);

// Get initial state from Inertia props, falling back to true if unavailable
const getInitialSidebarState = (): boolean => {
  if (existingSidebar) return existingSidebar.isOpen.value;
  try {
    const page = usePage<SharedData>();
    return page?.props?.sidebarOpen ?? true;
  } catch {
    return true;
  }
};

const isOpen = ref(getInitialSidebarState());
const isMobile = ref(false);

// Check for mobile on mount
if (typeof window !== 'undefined') {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
}

const toggle = () => {
  isOpen.value = !isOpen.value;
};

// Provide sidebar state to children
provide('sidebar', {
  isOpen,
  isMobile,
  toggle,
});
</script>

<template>
  <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
    <slot />
  </div>
  <div v-else class="flex h-screen">
    <slot />
  </div>
</template>
