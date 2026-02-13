<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { InputGroupButton } from "@/components/input-group"
import type { ButtonVariants } from "@/components/button"
import { CornerDownLeft, Loader2, Square, X } from "lucide-vue-next"
import type { ChatStatus } from "./types"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    variant?: ButtonVariants["variant"]
    status?: ChatStatus
    disabled?: boolean
  }>(),
  {
    variant: "default",
    status: "ready",
  }
)

const emit = defineEmits<{
  stop: []
}>()



const isGenerating = computed(
  () => props.status === "submitted" || props.status === "streaming"
)

const handleClick = (e: MouseEvent) => {
  if (isGenerating.value) {
    e.preventDefault()
    emit("stop")
  }
}

const ariaLabel = computed(() => (isGenerating.value ? "Stop" : "Submit"))
const buttonType = computed(() =>
  isGenerating.value ? "button" : "submit"
)
</script>

<template>
  <InputGroupButton
    :aria-label="ariaLabel"
    :type="buttonType"
    :variant="props.variant"
    size="icon-sm"
    :disabled="props.disabled"
    :class="cn('rounded-lg', props.class)"
    @click="handleClick"
  >
    <slot>
      <Loader2 v-if="status === 'submitted'" class="size-4 animate-spin" />
      <Square v-else-if="status === 'streaming'" class="size-4" />
      <X v-else-if="status === 'error'" class="size-4" />
      <CornerDownLeft v-else class="size-4" />
    </slot>
  </InputGroupButton>
</template>
