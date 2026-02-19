import type { ComputedRef, InjectionKey, Ref } from "vue"

export interface ChatConversationContext {
  isAtBottom: ComputedRef<boolean>
  isAtTop: ComputedRef<boolean>
  isLoadingMore: ComputedRef<boolean>
  hasMoreMessages: ComputedRef<boolean>
  scrollToBottom: () => void
  scrollToMaintainPosition: (previousScrollHeight: number) => void
}

export interface LoadMoreState {
  isLoading: Ref<boolean>
  hasMore: Ref<boolean>
}

export const chatConversationKey: InjectionKey<ChatConversationContext> =
  Symbol("chatConversation")
