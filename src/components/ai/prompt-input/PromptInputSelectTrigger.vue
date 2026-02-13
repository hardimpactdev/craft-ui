<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { SelectTrigger } from "@/components/select"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <SelectTrigger
    :class="cn(
      'h-8 border-none bg-transparent px-2 font-medium text-muted-foreground shadow-none transition-colors',
      'hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground',
      'focus:ring-0 focus:ring-offset-0',
      props.class
    )"
  >
    <slot />
  </SelectTrigger>
</template>
