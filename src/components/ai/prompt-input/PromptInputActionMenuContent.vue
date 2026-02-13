<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { DropdownMenuContent } from "@/components/dropdown-menu"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuContent align="start" :class="cn(props.class)">
    <slot />
  </DropdownMenuContent>
</template>
