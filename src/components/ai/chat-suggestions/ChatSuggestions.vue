<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ScrollArea :class="cn('w-full', props.class)" orientation="horizontal">
    <div class="flex gap-2 p-1">
      <slot />
    </div>
    <ScrollBar orientation="horizontal" class="hidden" />
  </ScrollArea>
</template>
