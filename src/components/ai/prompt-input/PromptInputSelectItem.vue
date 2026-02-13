<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { SelectItem } from "@/components/select"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  value: string
}>()
</script>

<template>
  <SelectItem :value="props.value" :class="cn(props.class)">
    <slot />
  </SelectItem>
</template>
