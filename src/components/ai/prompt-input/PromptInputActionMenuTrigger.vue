<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { DropdownMenuTrigger } from "@/components/dropdown-menu"
import PromptInputButton from "./PromptInputButton.vue"
import { Plus } from "lucide-vue-next"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuTrigger as-child>
    <PromptInputButton :class="cn(props.class)">
      <slot>
        <Plus class="size-4" />
      </slot>
    </PromptInputButton>
  </DropdownMenuTrigger>
</template>
