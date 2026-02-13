<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Select } from "@/components/select"
import type { AcceptableValue } from "reka-ui"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
}>()

const handleUpdate = (value: AcceptableValue) => {
  if (typeof value === "string") {
    emit("update:modelValue", value)
  }
}
</script>

<template>
  <Select :model-value="props.modelValue" @update:model-value="handleUpdate">
    <slot />
  </Select>
</template>
