<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import type { HTMLAttributes } from "vue"
import { BubbleMenu } from "@tiptap/vue-3/menus"
import { Button } from "@/components/button"
import { cn } from "@/lib/cn"
import {
  Bold,
  Italic,
  Strikethrough,
  Link,
} from "lucide-vue-next"

interface Props {
  editor: Editor | undefined
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

const setLink = () => {
  if (!props.editor) return
  
  const previousUrl = props.editor.getAttributes("link").href
  const url = window.prompt("Enter URL", previousUrl)
  
  if (url === null) return
  
  if (url === "") {
    props.editor.chain().focus().extendMarkRange("link").unsetLink().run()
  } else {
    props.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }
}
</script>

<template>
  <BubbleMenu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <div
      data-slot="editor-bubble-menu"
      :class="cn(
        'flex items-center gap-1 p-1.5 rounded-lg border border-input bg-popover shadow-md',
        props.class,
      )"
    >
      <Button
        type="button"
        :variant="editor?.isActive('bold') ? 'secondary' : 'outline'"
        :disabled="!editor?.can().chain().focus().toggleBold().run()"
        size="icon-sm"
        aria-label="Toggle bold"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Bold class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('italic') ? 'secondary' : 'outline'"
        :disabled="!editor?.can().chain().focus().toggleItalic().run()"
        size="icon-sm"
        aria-label="Toggle italic"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <Italic class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('strike') ? 'secondary' : 'outline'"
        :disabled="!editor?.can().chain().focus().toggleStrike().run()"
        size="icon-sm"
        aria-label="Toggle strikethrough"
        @click="editor?.chain().focus().toggleStrike().run()"
      >
        <Strikethrough class="size-4" />
      </Button>
      
      <div class="w-px h-4 bg-border mx-1" />
      
      <Button
        type="button"
        :variant="editor?.isActive('link') ? 'secondary' : 'outline'"
        size="icon-sm"
        aria-label="Toggle link"
        @click="setLink"
      >
        <Link class="size-4" />
      </Button>
    </div>
  </BubbleMenu>
</template>
