// Types
export * from "./types"

// Composables
export { usePromptInput } from "./usePromptInput"

// Components
export { default as PromptInput } from "./PromptInput.vue"
export { default as PromptInputTextarea } from "./PromptInputTextarea.vue"
export { default as PromptInputHeader } from "./PromptInputHeader.vue"
export { default as PromptInputFooter } from "./PromptInputFooter.vue"
export { default as PromptInputTools } from "./PromptInputTools.vue"
export { default as PromptInputButton } from "./PromptInputButton.vue"
export { default as PromptInputSubmit } from "./PromptInputSubmit.vue"
export { default as PromptInputAttachments } from "./PromptInputAttachments.vue"
export { default as PromptInputActionMenu } from "./PromptInputActionMenu.vue"
export { default as PromptInputActionMenuTrigger } from "./PromptInputActionMenuTrigger.vue"
export { default as PromptInputActionMenuContent } from "./PromptInputActionMenuContent.vue"
export { default as PromptInputActionMenuItem } from "./PromptInputActionMenuItem.vue"
export { default as PromptInputActionAddAttachments } from "./PromptInputActionAddAttachments.vue"
export { default as PromptInputAddAttachment } from "./PromptInputAddAttachment.vue"

// Select components for model selection
export { default as PromptInputSelect } from "./PromptInputSelect.vue"
export { default as PromptInputSelectTrigger } from "./PromptInputSelectTrigger.vue"
export { default as PromptInputSelectContent } from "./PromptInputSelectContent.vue"
export { default as PromptInputSelectItem } from "./PromptInputSelectItem.vue"

// Re-export SelectValue from select component for convenience
export { SelectValue as PromptInputSelectValue } from "@/components/select"
