<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { SelectContent } from "@/components/select"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <SelectContent :class="cn(props.class)">
    <slot />
  </SelectContent>
</template>
