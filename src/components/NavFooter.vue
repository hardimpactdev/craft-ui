<script setup lang="ts">
import type { NavItem } from '@/types';
import Icon from './Icon.vue';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/sidebar';

defineProps<{
  items: NavItem[];
}>();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in items" :key="item.title">
      <SidebarMenuButton :tooltip="item.title" as-child>
        <a :href="item.href" target="_blank" rel="noopener noreferrer">
          <Icon
            v-if="typeof item.icon === 'string'"
            :name="item.icon"
          />
          <component
            v-else-if="item.icon"
            :is="item.icon"
          />
          <span>{{ item.title }}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
