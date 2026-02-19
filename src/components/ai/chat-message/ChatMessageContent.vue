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
        'group-[.is-user]:bg-secondary group-[.is-user]:rounded-xl group-[.is-user]:px-3.5 group-[.is-user]:py-2',
        'group-[.is-assistant]:text-foreground',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
