<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useAttrs } from "vue"
import { cn } from "@/lib/utils"
import { Textarea } from '@/components/textarea'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

// Forward all other attributes (value, placeholder, disabled, etc.)
defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
</script>

<template>
  <Textarea
    v-bind="attrs"
    data-slot="input-group-control"
    :class="cn(
      'flex-1 resize-none rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent min-h-0',
      props.class,
    )"
  />
</template>
