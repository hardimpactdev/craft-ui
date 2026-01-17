<script setup lang="ts">
import type { Method } from '@inertiajs/core';
import AuthSimpleLayout from './AuthSimpleLayout.vue';

defineProps<{
  title?: string;
  description?: string;
  logoLink?:
    | string
    | {
        url: string;
        method: Method;
      };
}>();
</script>

<template>
  <AuthSimpleLayout :title="title" :description="description" :logo-link="logoLink">
    <template #logo>
      <slot name="logo" />
    </template>
    <slot />
  </AuthSimpleLayout>
</template>
