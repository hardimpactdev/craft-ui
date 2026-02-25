<script setup lang="ts">
import { ChevronsUpDown } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import UserMenuContent from '@/components/UserMenuContent.vue';
import type { User } from '@/types';

defineProps<{
  user: User;
  onSettings?: () => void;
  onLogout?: () => void;
}>();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage v-if="user.avatar" :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">{{ user.name?.[0] || '?' }}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="useSidebar().isMobile.value ? 'bottom' : useSidebar().state.value === 'collapsed' ? 'left' : 'bottom'"
          align="end"
          :side-offset="4"
        >
          <UserMenuContent :user="user" :on-settings="onSettings" :on-logout="onLogout" />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
