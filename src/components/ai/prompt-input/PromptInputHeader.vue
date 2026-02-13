<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { InputGroupAddon } from "@/components/input-group"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <InputGroupAddon
    align="block-end"
    :class="cn('order-first flex-wrap gap-1 empty:hidden empty:p-0', props.class)"
  >
    <slot />
  </InputGroupAddon>
</template>
