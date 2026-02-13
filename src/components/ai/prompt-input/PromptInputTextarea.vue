<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, ref, computed } from "vue"
import { cn } from "@/lib/utils"
import { InputGroupTextarea } from "@/components/input-group"
import { promptInputKey } from "./types"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    placeholder: "What would you like to know?",
  }
)

const context = inject(promptInputKey)
const isComposing = ref(false)

// Access the context value properly (context is a ComputedRef)
const inputValue = computed(() => context?.value?.inputValue?.value ?? "")
const attachments = computed(() => context?.value?.attachments?.value ?? [])

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    if (isComposing.value || (e as any).isComposing) return
    if (e.shiftKey) return

    e.preventDefault()

    // Check if submit button is disabled
    const form = (e.target as HTMLElement).closest("form")
    const submitButton = form?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement | null
    if (submitButton?.disabled) return

    form?.requestSubmit()
  }

  // Remove last attachment when Backspace is pressed and textarea is empty
  if (
    e.key === "Backspace" &&
    inputValue.value === "" &&
    attachments.value.length > 0
  ) {
    e.preventDefault()
    const lastAttachment = attachments.value.at(-1)
    if (lastAttachment) {
      context?.value?.removeFile(lastAttachment.id)
    }
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return

  const files: File[] = []

  for (const item of items) {
    if (item.kind === "file") {
      const file = item.getAsFile()
      if (file) {
        files.push(file)
      }
    }
  }

  if (files.length > 0) {
    event.preventDefault()
    context?.value?.addFiles(files)
  }
}

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  context?.value?.setInput(target.value)
}
</script>

<template>
  <InputGroupTextarea
    :model-value="inputValue"
    name="message"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="cn('field-sizing-content max-h-48 min-h-0 px-3 pt-2.5 pb-2', props.class)"
    @input="handleInput"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    @compositionstart="isComposing = true"
    @compositionend="isComposing = false"
  />
</template>
