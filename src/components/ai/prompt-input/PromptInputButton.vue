<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { InputGroupButton, type InputGroupButtonVariants } from "@/components/input-group"
import type { ButtonVariants } from "@/components/button"
import { useSlots } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    variant?: ButtonVariants["variant"]
    size?: InputGroupButtonVariants["size"]
  }>(),
  {
    variant: "ghost",
  }
)

const slots = useSlots()

// Determine size based on slot content if not provided
const computedSize = () => {
  if (props.size) return props.size
  // Default to icon-sm for single child, sm for multiple
  const slotContent = slots.default?.({})
  return slotContent && slotContent.length > 1 ? "sm" : "icon-sm"
}
</script>

<template>
  <InputGroupButton
    type="button"
    :variant="props.variant"
    :size="computedSize()"
    :class="cn('text-muted-foreground hover:text-foreground', props.class)"
  >
    <slot />
  </InputGroupButton>
</template>
