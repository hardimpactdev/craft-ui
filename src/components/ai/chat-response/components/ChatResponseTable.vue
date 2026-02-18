<script setup lang="ts">
import type { Tokens } from "marked"
import { renderTokens } from "../renderTokens"

defineProps<{
  align: Array<"center" | "left" | "right" | null>
  header: Tokens.TableCell[]
  rows: Tokens.TableCell[][]
}>()

function renderCell(cell: Tokens.TableCell) {
  return renderTokens(cell.tokens, {})
}
</script>

<template>
  <div class="my-4 overflow-x-auto">
    <table class="w-full text-sm border-collapse">
      <thead>
        <tr class="border-b border-border">
          <th
            v-for="(cell, i) in header"
            :key="i"
            class="px-3 py-2 text-left font-semibold"
            :style="cell.align ? { textAlign: cell.align } : undefined"
          >
            <component :is="() => renderCell(cell)" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, ri) in rows"
          :key="ri"
          class="border-b border-border/50"
        >
          <td
            v-for="(cell, ci) in row"
            :key="ci"
            class="px-3 py-2"
            :style="cell.align ? { textAlign: cell.align } : undefined"
          >
            <component :is="() => renderCell(cell)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
