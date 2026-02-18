import type { InjectionKey } from "vue"

export type MessageRole = "user" | "assistant"

export interface ChatMessageContext {
  role: MessageRole
}

export const chatMessageKey: InjectionKey<ChatMessageContext> =
  Symbol("chatMessage")
