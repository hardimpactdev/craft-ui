<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { InputGroupButton, type InputGroupButtonVariants } from "@/components/input-group"
import type { ButtonVariants } from "@/components/button"
import { ImageIcon } from "lucide-vue-next"
import { promptInputKey } from "./types"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    variant?: ButtonVariants["variant"]
    size?: InputGroupButtonVariants["size"]
    disabled?: boolean
  }>(),
  {
    variant: "ghost",
    size: "icon-sm",
    disabled: false,
  }
)

const context = inject(promptInputKey)

const handleClick = () => {
  context?.value?.openFileDialog()
}
</script>

<template>
  <InputGroupButton
    type="button"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    :class="cn('text-muted-foreground hover:text-foreground', props.class)"
    @click="handleClick"
  >
    <slot>
      <ImageIcon class="size-4" />
    </slot>
  </InputGroupButton>
</template>
