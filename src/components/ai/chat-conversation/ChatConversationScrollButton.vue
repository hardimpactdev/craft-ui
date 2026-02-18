<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { useChatConversation } from "./useChatConversation"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isAtBottom, scrollToBottom } = useChatConversation()
</script>

<template>
  <Button
    v-show="!isAtBottom"
    variant="outline"
    size="icon-sm"
    :class="
      cn(
        'absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full shadow-md',
        props.class
      )
    "
    @click="scrollToBottom()"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </slot>
  </Button>
</template>
