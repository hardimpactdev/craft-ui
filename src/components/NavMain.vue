<script setup lang="ts">
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import Icon from './Icon.vue';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/sidebar';

interface Props {
  items: NavItem[];
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: 'Platform',
});

const page = usePage<SharedData>();

const isActive = (item: NavItem): boolean => {
  return item.href === page.url || item.isActive === true;
};
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ label }}</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton :tooltip="item.title" :is-active="isActive(item)" as-child>
          <Link :href="item.href">
            <Icon
              v-if="typeof item.icon === 'string'"
              :name="item.icon"
            />
            <component
              v-else-if="item.icon"
              :is="item.icon"
            />
            <span>{{ item.title }}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
