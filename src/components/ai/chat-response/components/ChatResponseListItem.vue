<script setup lang="ts">
defineProps<{
  task: boolean
  checked?: boolean
  loose: boolean
}>()
</script>

<template>
  <li class="my-1" :class="{ 'list-none -ml-6': task }">
    <label v-if="task" class="inline-flex items-center gap-2">
      <input
        type="checkbox"
        :checked="checked ?? false"
        disabled
        class="rounded border-muted-foreground/50"
      />
      <slot />
    </label>
    <slot v-else />
  </li>
</template>
