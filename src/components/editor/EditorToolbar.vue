<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3"
import type { HTMLAttributes } from "vue"
import { Button } from "@/components/button"
import { cn } from "@/lib/cn"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Undo,
  Redo,
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
  <div
    data-slot="editor-toolbar"
    :class="cn(
      'flex flex-wrap items-center gap-1 p-2 border-b border-input bg-muted/50 rounded-t-md',
      props.class,
    )"
  >
    <!-- Text formatting -->
    <div class="flex items-center gap-1">
      <Button
        type="button"
        :variant="editor?.isActive('bold') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleBold().run()"
        size="icon-sm"
        aria-label="Toggle bold"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Bold class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('italic') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleItalic().run()"
        size="icon-sm"
        aria-label="Toggle italic"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <Italic class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('strike') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleStrike().run()"
        size="icon-sm"
        aria-label="Toggle strikethrough"
        @click="editor?.chain().focus().toggleStrike().run()"
      >
        <Strikethrough class="size-4" />
      </Button>
    </div>
    
    <div class="w-px h-6 bg-border mx-1" />
    
    <!-- Headings -->
    <div class="flex items-center gap-1">
      <Button
        type="button"
        :variant="editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleHeading({ level: 1 }).run()"
        size="icon-sm"
        aria-label="Toggle heading 1"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <Heading1 class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleHeading({ level: 2 }).run()"
        size="icon-sm"
        aria-label="Toggle heading 2"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Heading2 class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleHeading({ level: 3 }).run()"
        size="icon-sm"
        aria-label="Toggle heading 3"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <Heading3 class="size-4" />
      </Button>
    </div>
    
    <div class="w-px h-6 bg-border mx-1" />
    
    <!-- Lists -->
    <div class="flex items-center gap-1">
      <Button
        type="button"
        :variant="editor?.isActive('bulletList') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleBulletList().run()"
        size="icon-sm"
        aria-label="Toggle bullet list"
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        <List class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('orderedList') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleOrderedList().run()"
        size="icon-sm"
        aria-label="Toggle ordered list"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered class="size-4" />
      </Button>
    </div>
    
    <div class="w-px h-6 bg-border mx-1" />
    
    <!-- Other formatting -->
    <div class="flex items-center gap-1">
      <Button
        type="button"
        :variant="editor?.isActive('blockquote') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleBlockquote().run()"
        size="icon-sm"
        aria-label="Toggle blockquote"
        @click="editor?.chain().focus().toggleBlockquote().run()"
      >
        <Quote class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('code') ? 'secondary' : 'ghost'"
        :disabled="!editor?.can().chain().focus().toggleCode().run()"
        size="icon-sm"
        aria-label="Toggle code"
        @click="editor?.chain().focus().toggleCode().run()"
      >
        <Code class="size-4" />
      </Button>
      
      <Button
        type="button"
        :variant="editor?.isActive('link') ? 'secondary' : 'ghost'"
        size="icon-sm"
        aria-label="Toggle link"
        @click="setLink"
      >
        <Link class="size-4" />
      </Button>
    </div>
    
    <div class="w-px h-6 bg-border mx-1" />
    
    <!-- History -->
    <div class="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        :disabled="!editor?.can().chain().focus().undo().run()"
        size="icon-sm"
        aria-label="Undo"
        @click="editor?.chain().focus().undo().run()"
      >
        <Undo class="size-4" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        :disabled="!editor?.can().chain().focus().redo().run()"
        size="icon-sm"
        aria-label="Redo"
        @click="editor?.chain().focus().redo().run()"
      >
        <Redo class="size-4" />
      </Button>
    </div>
  </div>
</template>
