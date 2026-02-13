<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref, provide, computed, onUnmounted, watch } from "vue"
import { nanoid } from "nanoid"
import { cn } from "@/lib/utils"
import { InputGroup } from "@/components/input-group"
import {
  promptInputKey,
  type PromptInputContext,
  type FileAttachment,
  type PromptInputMessage,
} from "./types"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    accept?: string
    multiple?: boolean
    maxFiles?: number
    maxFileSize?: number
    globalDrop?: boolean
  }>(),
  {
    multiple: true,
    globalDrop: false,
  }
)

const emit = defineEmits<{
  submit: [message: PromptInputMessage, event: Event]
  error: [error: { code: "max_files" | "max_file_size" | "accept"; message: string }]
}>()

// Internal state
const inputValue = ref("")
const attachments = ref<FileAttachment[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)

// File validation
const matchesAccept = (file: File): boolean => {
  if (!props.accept || props.accept.trim() === "") return true

  const patterns = props.accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  return patterns.some((pattern) => {
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1)
      return file.type.startsWith(prefix)
    }
    return file.type === pattern
  })
}

// Add files
const addFiles = (files: File[] | FileList) => {
  const incoming = Array.from(files)
  const accepted = incoming.filter((f) => matchesAccept(f))

  if (incoming.length && accepted.length === 0) {
    emit("error", {
      code: "accept",
      message: "No files match the accepted types.",
    })
    return
  }

  const withinSize = (f: File) =>
    props.maxFileSize ? f.size <= props.maxFileSize : true
  const sized = accepted.filter(withinSize)

  if (accepted.length > 0 && sized.length === 0) {
    emit("error", {
      code: "max_file_size",
      message: "All files exceed the maximum size.",
    })
    return
  }

  const capacity =
    typeof props.maxFiles === "number"
      ? Math.max(0, props.maxFiles - attachments.value.length)
      : undefined
  const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized

  if (typeof capacity === "number" && sized.length > capacity) {
    emit("error", {
      code: "max_files",
      message: "Too many files. Some were not added.",
    })
  }

  const newAttachments: FileAttachment[] = capped.map((file) => ({
    id: nanoid(),
    type: "file",
    url: URL.createObjectURL(file),
    mediaType: file.type,
    filename: file.name,
  }))

  attachments.value = [...attachments.value, ...newAttachments]
}

// Remove file
const removeFile = (id: string) => {
  const found = attachments.value.find((f) => f.id === id)
  if (found?.url) {
    URL.revokeObjectURL(found.url)
  }
  attachments.value = attachments.value.filter((f) => f.id !== id)
}

// Clear all
const clearAttachments = () => {
  for (const f of attachments.value) {
    if (f.url) {
      URL.revokeObjectURL(f.url)
    }
  }
  attachments.value = []
}

const clearInput = () => {
  inputValue.value = ""
}

const clear = () => {
  clearAttachments()
  clearInput()
}

// Open file dialog
const openFileDialog = () => {
  fileInputRef.value?.click()
}

// Handle file input change
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(target.files)
  }
  target.value = ""
}

// Convert blob URL to data URL
const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

// Handle form submit
const handleSubmit = async (event: Event) => {
  event.preventDefault()

  if (isSubmitting.value) return
  isSubmitting.value = true

  const text = inputValue.value

  try {
    // Convert blob URLs to data URLs
    const convertedFiles = await Promise.all(
      attachments.value.map(async ({ id, ...item }) => {
        if (item.url?.startsWith("blob:")) {
          const dataUrl = await convertBlobUrlToDataUrl(item.url)
          return {
            ...item,
            url: dataUrl ?? item.url,
          }
        }
        return item
      })
    )

    emit("submit", { text, files: convertedFiles }, event)
    clear()
  } catch {
    // Don't clear on error - user may want to retry
  } finally {
    isSubmitting.value = false
  }
}

// Drag and drop
const handleDragOver = (e: DragEvent) => {
  if (e.dataTransfer?.types?.includes("Files")) {
    e.preventDefault()
  }
}

const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer?.types?.includes("Files")) {
    e.preventDefault()
  }
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    addFiles(e.dataTransfer.files)
  }
}

// Global drop handler
watch(
  () => props.globalDrop,
  (globalDrop) => {
    if (globalDrop) {
      document.addEventListener("dragover", handleDragOver)
      document.addEventListener("drop", handleDrop)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  // Cleanup blob URLs
  for (const f of attachments.value) {
    if (f.url) {
      URL.revokeObjectURL(f.url)
    }
  }

  // Remove global drop listeners
  if (props.globalDrop) {
    document.removeEventListener("dragover", handleDragOver)
    document.removeEventListener("drop", handleDrop)
  }
})

// Provide context
const context = computed<PromptInputContext>(() => ({
  inputValue,
  setInput: (value: string) => {
    inputValue.value = value
  },
  attachments,
  addFiles,
  removeFile,
  clearAttachments,
  openFileDialog,
  fileInputRef,
  isSubmitting,
  submit: () => formRef.value?.requestSubmit(),
}))

provide(promptInputKey, context)

// Expose for external access
defineExpose({
  inputValue,
  attachments,
  addFiles,
  clear,
  openFileDialog,
  submit: () => formRef.value?.requestSubmit(),
})
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      type="file"
      :accept="props.accept"
      :multiple="props.multiple"
      class="hidden"
      aria-label="Upload files"
      @change="handleFileChange"
    />
    <form
      ref="formRef"
      :class="cn('w-full', props.class)"
      @submit="handleSubmit"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <InputGroup class="overflow-hidden rounded-xl">
        <slot />
      </InputGroup>
    </form>
  </div>
</template>
