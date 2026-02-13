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
    :class="cn('justify-between gap-2 px-2.5 pb-2.5', props.class)"
  >
    <slot />
  </InputGroupAddon>
</template>
