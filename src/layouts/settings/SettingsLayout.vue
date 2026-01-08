<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { Link } from '@inertiajs/vue3';

interface SettingsNavItem {
  title: string;
  href: string;
}

const sidebarNavItems: SettingsNavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
  },
  {
    title: 'Password',
    href: '/settings/password',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
];

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

// Check if a URL is active (exact match or starts with for nested routes)
const isActive = (href: string): boolean => {
  return currentPath === href || currentPath.startsWith(href + '/');
};
</script>

<template>
  <div class="px-4 py-6">
    <Heading title="Settings" description="Manage your profile and account settings" />

    <div class="flex flex-col lg:flex-row lg:space-x-12">
      <aside class="w-full max-w-xl lg:w-48">
        <nav class="flex flex-col space-y-1" aria-label="Settings">
          <Link
            v-for="item in sidebarNavItems"
            :key="item.href"
            :href="item.href"
            class="flex h-9 items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            :class="{ 'bg-muted': isActive(item.href) }"
          >
            {{ item.title }}
          </Link>
        </nav>
      </aside>

      <div class="my-6 h-px bg-border lg:hidden" />

      <div class="flex-1 md:max-w-2xl">
        <section class="max-w-xl space-y-12">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>
