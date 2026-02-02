<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/cn"
import { watch, onBeforeUnmount, computed } from "vue"
import "./editor.css"

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  class?: HTMLAttributes["class"]
  editorClass?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Start typing...",
  disabled: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "text-primary underline underline-offset-4 hover:text-primary/80",
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  editorProps: {
    attributes: {
      class: cn(
        "min-h-[150px] p-4 focus:outline-none",
      ),
    },
  },
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML())
  },
  editable: !props.disabled,
})

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value && editor.value.getHTML() !== value) {
      editor.value.commands.setContent(value, { emitUpdate: false })
    }
  },
)

watch(
  () => props.disabled,
  (disabled) => {
    if (editor.value) {
      editor.value.setEditable(!disabled)
    }
  },
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

defineExpose({
  editor: computed(() => editor.value),
})
</script>

<template>
  <div
    data-slot="editor"
    :class="cn(
      'relative w-full rounded-md border border-input bg-background shadow-sm',
      'focus-within:border-ring focus-within:ring-1 focus-within:ring-ring',
      disabled && 'opacity-50 cursor-not-allowed',
      props.class,
    )"
  >
    <EditorContent
      :editor="editor"
      :class="cn('w-full', props.editorClass)"
    />

  </div>
</template>
