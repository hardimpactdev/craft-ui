<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    :class="
      cn(
        'group-[.is-user]:bg-secondary group-[.is-user]:rounded-lg group-[.is-user]:px-4 group-[.is-user]:py-3',
        'group-[.is-assistant]:text-foreground',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
