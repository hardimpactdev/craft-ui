<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { marked } from "marked"
import { cn } from "@/lib/utils"
import { renderTokens } from "./renderTokens"
import type { ChatResponseComponents } from "./types"
import { chatResponseDefaults } from "./components"


const props = defineProps<{
  content: string
  components?: ChatResponseComponents
  class?: HTMLAttributes["class"]
}>()

const tokens = computed(() =>
  marked.lexer(props.content, { breaks: true, gfm: true })
)

const effectiveComponents = computed(() => ({
  ...chatResponseDefaults,
  ...props.components,
}))

const vnodes = computed(() =>
  renderTokens(tokens.value, effectiveComponents.value)
)
</script>

<template>
  <div :class="cn('max-w-none', props.class)">
    <component :is="() => vnodes" />
  </div>
</template>
