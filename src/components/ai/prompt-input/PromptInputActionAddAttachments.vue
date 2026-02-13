<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { DropdownMenuItem } from "@/components/dropdown-menu"
import { ImageIcon } from "lucide-vue-next"
import { promptInputKey } from "./types"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    label?: string
  }>(),
  {
    label: "Add photos or files",
  }
)

const context = inject(promptInputKey)

const handleSelect = (e: Event) => {
  e.preventDefault()
  context?.value.openFileDialog()
}
</script>

<template>
  <DropdownMenuItem :class="cn(props.class)" @select="handleSelect">
    <ImageIcon class="mr-2 size-4" />
    {{ props.label }}
  </DropdownMenuItem>
</template>
