<script setup lang="ts">
import Popover from '@nuxt/ui/components/Popover.vue';
import UserInfo from '@/components/UserInfo.vue';
import UserMenuContent from './UserMenuContent.vue';
import type { SharedData, User } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { ChevronsUpDown } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
  collapsed?: boolean;
}

defineProps<Props>();

const page = usePage<SharedData>();
const user = page.props.auth.user as User;
const isOpen = ref(false);
</script>

<template>
  <div class="px-2 pt-2">
    <Popover v-model:open="isOpen">
      <button
        class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
        :class="collapsed ? 'justify-center' : ''"
        :aria-label="'User menu for ' + user.name"
        @click="isOpen = !isOpen"
      >
        <UserInfo :user="user" />
        <ChevronsUpDown v-if="!collapsed" class="ml-auto h-4 w-4 text-muted-foreground" />
      </button>

      <template #content>
        <UserMenuContent :user="user" />
      </template>
    </Popover>
  </div>
</template>
