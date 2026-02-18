<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

const props = defineProps<{
  suggestion: string
  class?: HTMLAttributes["class"]
}>()

const emit = defineEmits<{
  click: [suggestion: string]
}>()
</script>

<template>
  <Button
    variant="outline"
    size="sm"
    :class="cn('shrink-0 rounded-full px-4', props.class)"
    @click="emit('click', suggestion)"
  >
    {{ suggestion }}
  </Button>
</template>
