<script setup lang="ts">
import { computed } from 'vue';
import type { Method } from '@inertiajs/core';
import type { AuthLayoutVariant } from '@/pages/auth/types';
import AuthSimpleLayout from './AuthSimpleLayout.vue';
import AuthSplitLayout from './AuthSplitLayout.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    name?: string;
    variant?: AuthLayoutVariant;
    logoLink?:
      | string
      | {
          url: string;
          method: Method;
        };
  }>(),
  {
    variant: 'simple',
  }
);

const layoutComponent = computed(() =>
  props.variant === 'split' ? AuthSplitLayout : AuthSimpleLayout
);
</script>

<template>
  <component
    :is="layoutComponent"
    :title="title"
    :description="description"
    :logo-link="logoLink"
    v-bind="variant === 'split' ? { name } : {}"
  >
    <template #logo>
      <slot name="logo" />
    </template>
    <slot />
  </component>
</template>
