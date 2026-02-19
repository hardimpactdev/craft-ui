<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, provide, ref, watch, nextTick } from "vue"
import { useStickToBottom } from "vue-stick-to-bottom"
import { cn } from "@/lib/utils"
import { chatConversationKey } from "./types"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  hasMoreMessages?: boolean
  isLoadingMore?: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const { scrollRef, contentRef, isAtBottom, scrollToBottom } =
  useStickToBottom({ initial: 'instant' })

const isAtBottomSafe = computed(() => isAtBottom.value ?? true)

// Track scroll position for infinite scroll
const isAtTop = ref(false)
const lastScrollHeight = ref(0)

// Internal loading state that can be controlled via prop or internal
const internalIsLoadingMore = ref(false)
const isLoadingMoreSafe = computed(() => props.isLoadingMore ?? internalIsLoadingMore.value)

// Internal hasMore state that can be controlled via prop
const internalHasMore = ref(true)
const hasMoreMessagesSafe = computed(() => props.hasMoreMessages ?? internalHasMore.value)

// Handle scroll events to detect when user reaches top
const handleScroll = async () => {
  if (!scrollRef.value) return
  
  const { scrollTop, scrollHeight } = scrollRef.value
  
  // Check if at top (within 50px threshold)
  const atTop = scrollTop < 50
  
  // Only trigger load more if:
  // - We're at the top
  // - We're not already loading
  // - There are more messages to load
  if (atTop && !isLoadingMoreSafe.value && hasMoreMessagesSafe.value) {
    // Save current scroll height before loading
    lastScrollHeight.value = scrollHeight
    emit('loadMore')
  }
  
  isAtTop.value = atTop
}

// Watch for scroll ref and attach listener
watch(() => scrollRef.value, (newRef) => {
  if (newRef) {
    newRef.addEventListener('scroll', handleScroll, { passive: true })
  }
}, { immediate: true })

// Method to maintain scroll position after prepending content
const scrollToMaintainPosition = async (previousScrollHeight: number) => {
  await nextTick()
  if (!scrollRef.value) return
  
  const newScrollHeight = scrollRef.value.scrollHeight
  const heightDifference = newScrollHeight - previousScrollHeight
  
  // Adjust scroll position to account for new content above
  scrollRef.value.scrollTop = heightDifference + 50 // 50px buffer to show some of the new content
}

provide(chatConversationKey, {
  isAtBottom: isAtBottomSafe,
  isAtTop: computed(() => isAtTop.value),
  isLoadingMore: isLoadingMoreSafe,
  hasMoreMessages: hasMoreMessagesSafe,
  scrollToBottom,
  scrollToMaintainPosition,
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
