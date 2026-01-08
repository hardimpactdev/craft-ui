<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps<{
  name: string | object;
}>();

/**
 * Convert icon name formats:
 * - "i-lucide-home" -> "lucide:home"
 * - "i-heroicons-star" -> "heroicons:star"
 * - "lucide:home" -> "lucide:home" (already correct)
 */
const iconName = computed<string>(() => {
  if (typeof props.name !== 'string') return '';

  // Already in correct format
  if (props.name.includes(':')) return props.name;

  // Convert i-{collection}-{name} to {collection}:{name}
  const withoutPrefix = props.name.replace(/^i-/, '');
  const firstHyphen = withoutPrefix.indexOf('-');

  if (firstHyphen === -1) return withoutPrefix;

  const collection = withoutPrefix.substring(0, firstHyphen);
  const name = withoutPrefix.substring(firstHyphen + 1);

  return `${collection}:${name}`;
});
</script>

<template>
  <IconifyIcon v-if="typeof name === 'string'" :icon="iconName" />
  <component :is="name" v-else />
</template>
