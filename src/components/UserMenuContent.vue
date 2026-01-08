<script setup lang="ts">
import Separator from '@nuxt/ui/components/Separator.vue';
import UserInfo from '@/components/UserInfo.vue';
import type { User, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/vue3';
import { LogOut, Settings } from 'lucide-vue-next';

defineOptions({
    inheritAttrs: false,
});

interface Props {
  user: User;
}

const handleLogout = () => {
  router.flushAll();
};

defineProps<Props>();

const page = usePage<SharedData>();
</script>

<template>
  <div class="p-2">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserInfo :user="user" :show-email="true" />
    </div>
  </div>

  <Separator />

  <div class="p-1">
    <Link
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
      :href="page.props.navigation.app.settings"
      prefetch
    >
      <Settings class="h-4 w-4" />
      Settings
    </Link>
  </div>

  <Separator />

  <div class="p-1">
    <Link
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
      method="post"
      :href="page.props.navigation.app.logout"
      @click="handleLogout"
      as="button"
    >
      <LogOut class="h-4 w-4" />
      Log out
    </Link>
  </div>
</template>
