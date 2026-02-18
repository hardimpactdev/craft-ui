<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"

const props = defineProps<{
  tooltip?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <TooltipProvider v-if="tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="ghost"
          size="icon-sm"
          :class="
            cn('text-muted-foreground hover:text-foreground', props.class)
          "
        >
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    v-else
    variant="ghost"
    size="icon-sm"
    :class="
      cn('text-muted-foreground hover:text-foreground', props.class)
    "
  >
    <slot />
  </Button>
</template>
