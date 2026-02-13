import { inject } from "vue"
import { promptInputKey, type PromptInputContext } from "./types"

/**
 * Composable to access PromptInput context from child components
 */
export function usePromptInput(): PromptInputContext {
  const context = inject(promptInputKey)

  if (!context) {
    throw new Error(
      "usePromptInput must be used within a PromptInput component"
    )
  }

  return context.value
}
