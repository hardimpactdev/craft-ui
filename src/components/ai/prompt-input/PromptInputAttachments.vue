<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { X, FileIcon } from "lucide-vue-next"
import { promptInputKey } from "./types"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const context = inject(promptInputKey)

const attachments = computed(() => context?.value?.attachments?.value ?? [])

const removeFile = (id: string) => {
  context?.value?.removeFile(id)
}

const isImage = (mediaType: string) => mediaType.startsWith("image/")

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`
}
</script>

<template>
  <div
    v-if="attachments.length"
    :class="cn('flex flex-wrap gap-2', props.class)"
  >
    <div
      v-for="attachment in attachments"
      :key="attachment.id"
      class="group relative flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1.5 text-sm"
    >
      <!-- Image preview -->
      <template v-if="isImage(attachment.mediaType)">
        <img
          :src="attachment.url"
          :alt="attachment.filename"
          class="size-8 rounded object-cover"
        />
      </template>
      <!-- File icon -->
      <template v-else>
        <FileIcon class="size-4 text-muted-foreground" />
      </template>

      <div class="flex flex-col">
        <span class="max-w-[120px] truncate text-xs">
          {{ attachment.filename }}
        </span>
        <span class="text-[10px] text-muted-foreground">
          {{ formatFileSize(attachment.size || 0) }}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        class="size-5 opacity-0 transition-opacity group-hover:opacity-100"
        @click="removeFile(attachment.id)"
      >
        <X class="size-3" />
        <span class="sr-only">Remove file</span>
      </Button>
    </div>
  </div>
</template>
