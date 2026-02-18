import type { ComputedRef, InjectionKey } from "vue"

export interface ChatConversationContext {
  isAtBottom: ComputedRef<boolean>
  scrollToBottom: () => void
}

export const chatConversationKey: InjectionKey<ChatConversationContext> =
  Symbol("chatConversation")
