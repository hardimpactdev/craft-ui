<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Spinner from "@/components/spinner/Spinner.vue"
import { useChatConversation } from "./useChatConversation"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  loadingText?: string
  noMoreText?: string
}>()

const { isLoadingMore, hasMoreMessages } = useChatConversation()

const showLoading = computed(() => isLoadingMore.value)
const showNoMore = computed(() => !hasMoreMessages.value && !isLoadingMore.value)
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-center py-4 transition-opacity duration-200',
      props.class
    )"
  >
    <!-- Loading State -->
    <div
      v-if="showLoading"
      class="flex items-center gap-2 text-muted-foreground"
    >
      <Spinner class="size-4" />
      <span class="text-sm">{{ loadingText ?? 'Loading older messages...' }}</span>
    </div>
    
    <!-- No More Messages State -->
    <div
      v-else-if="showNoMore"
      class="text-sm text-muted-foreground"
    >
      {{ noMoreText ?? 'No more messages' }}
    </div>
    
    <!-- Spacer when neither loading nor at end (to maintain scroll area) -->
    <div v-else class="h-4" />
  </div>
</template>
