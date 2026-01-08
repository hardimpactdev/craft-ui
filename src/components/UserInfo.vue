<script setup lang="ts">
import Avatar from '@nuxt/ui/components/Avatar.vue';
import { useInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { computed } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
  user: User;
  showEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showEmail: false,
});

const { getInitials } = useInitials();

const showAvatar = computed(() => props.user.avatar && props.user.avatar !== '');
</script>

<template>
  <Avatar
    :src="showAvatar ? user.avatar : undefined"
    :alt="user.name"
    size="sm"
    class="rounded-lg"
  >
    {{ getInitials(user.name) }}
  </Avatar>

  <div class="grid flex-1 text-left text-sm leading-tight">
    <span class="truncate font-medium">{{ user.name }}</span>
    <span v-if="showEmail" class="truncate text-xs text-muted">{{ user.email }}</span>
  </div>
</template>
