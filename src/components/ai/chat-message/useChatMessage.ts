import { inject } from "vue"
import { chatMessageKey, type ChatMessageContext } from "./types"

export function useChatMessage(): ChatMessageContext {
  const context = inject(chatMessageKey)

  if (!context) {
    throw new Error(
      "useChatMessage must be used within a ChatMessage component"
    )
  }

  return context
}
