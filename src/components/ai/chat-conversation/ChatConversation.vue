<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { useStickToBottom } from "vue-stick-to-bottom"
import { cn } from "@/lib/utils"
import { chatConversationKey } from "./types"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { scrollRef, contentRef, isAtBottom, scrollToBottom } =
  useStickToBottom({ initial: 'instant' })

const isAtBottomSafe = computed(() => isAtBottom.value ?? true)

provide(chatConversationKey, {
  isAtBottom: isAtBottomSafe,
  scrollToBottom,
})
</script>

<template>
  <div
    :ref="(el) => { scrollRef = el as HTMLElement }"
    role="log"
    id="chat-conversation"
    :class="cn('relative flex-1 overflow-y-auto', props.class)"
  >
    <div :ref="(el) => { contentRef = el as HTMLElement }">
      <slot />
    </div>
  </div>
</template>
