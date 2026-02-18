<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { provide } from "vue"
import { cn } from "@/lib/utils"
import { chatMessageKey, type MessageRole } from "./types"

const props = defineProps<{
  role: MessageRole
  class?: HTMLAttributes["class"]
}>()

provide(chatMessageKey, { role: props.role })
</script>

<template>
  <div
    :class="
      cn(
        'group flex flex-col gap-1',
        role === 'user' ? 'is-user ml-auto max-w-[80%] items-end' : 'is-assistant max-w-[80%]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
