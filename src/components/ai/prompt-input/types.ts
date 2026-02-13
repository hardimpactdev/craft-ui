import type { InjectionKey, Ref, ComputedRef } from "vue"

export interface FileAttachment {
  id: string
  type: "file"
  url: string
  mediaType: string
  filename: string
  size?: number
}

export interface PromptInputMessage {
  text: string
  files: Omit<FileAttachment, "id">[]
}

export type ChatStatus = "ready" | "submitted" | "streaming" | "error"

export interface PromptInputContext {
  inputValue: Ref<string>
  setInput: (value: string) => void
  attachments: Ref<FileAttachment[]>
  addFiles: (files: File[] | FileList) => void
  removeFile: (id: string) => void
  clearAttachments: () => void
  openFileDialog: () => void
  fileInputRef: Ref<HTMLInputElement | null>
  isSubmitting: Ref<boolean>
  submit: () => void
}

export const promptInputKey: InjectionKey<ComputedRef<PromptInputContext>> =
  Symbol("promptInput")
