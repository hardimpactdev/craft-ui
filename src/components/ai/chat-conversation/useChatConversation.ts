import { inject } from "vue"
import { chatConversationKey, type ChatConversationContext } from "./types"

export function useChatConversation(): ChatConversationContext {
  const context = inject(chatConversationKey)

  if (!context) {
    throw new Error(
      "useChatConversation must be used within a ChatConversation component"
    )
  }

  return context
}
