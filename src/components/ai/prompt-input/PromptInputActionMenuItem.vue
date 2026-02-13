<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { DropdownMenuItem } from "@/components/dropdown-menu"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const emit = defineEmits<{
  select: [event: Event]
}>()
</script>

<template>
  <DropdownMenuItem :class="cn(props.class)" @select="emit('select', $event)">
    <slot />
  </DropdownMenuItem>
</template>
