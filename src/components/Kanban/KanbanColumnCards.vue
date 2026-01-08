<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { VueDraggable } from 'vue-draggable-plus';
import type { SortableEvent } from 'sortablejs';

interface CardItem {
  id: string | number;
  [key: string]: any;
}

interface Props {
  modelValue?: CardItem[];
  group?: string;
  class?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  group: 'kanban',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [cards: CardItem[]];
  'card-add': [event: { item: CardItem; newIndex: number; from: string; to: string }];
  'card-remove': [event: { item: CardItem; oldIndex: number; from: string; to: string }];
  'card-move': [event: { item: CardItem; oldIndex: number; newIndex: number }];
  'change': [event: SortableEvent];
}>();

// Use computed with getter/setter for v-model binding
const cards = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function handleChange(event: SortableEvent) {
  emit('change', event);
}

function handleAdd(event: SortableEvent) {
  const newIndex = event.newIndex ?? 0;
  const item = cards.value[newIndex];
  if (item) {
    emit('card-add', {
      item,
      newIndex,
      from: (event.from as HTMLElement).dataset.columnId || '',
      to: (event.to as HTMLElement).dataset.columnId || '',
    });
  }
}

function handleRemove(event: SortableEvent) {
  emit('card-remove', {
    item: event.item as unknown as CardItem,
    oldIndex: event.oldIndex ?? 0,
    from: (event.from as HTMLElement).dataset.columnId || '',
    to: (event.to as HTMLElement).dataset.columnId || '',
  });
}

function handleUpdate(event: SortableEvent) {
  const newIndex = event.newIndex ?? 0;
  const item = cards.value[newIndex];
  if (item) {
    emit('card-move', {
      item,
      oldIndex: event.oldIndex ?? 0,
      newIndex,
    });
  }
}
</script>

<template>
  <div
    data-liftoff-kanban-column-cards
    :class="cn(
      'flex-1 overflow-y-auto px-2 pt-0.5 pb-2',
      props.class
    )"
  >
    <VueDraggable
      v-model="cards"
      :group="props.group"
      :disabled="props.disabled"
      :animation="150"
      ghost-class="kanban-card-ghost"
      drag-class="kanban-card-drag"
      chosen-class="kanban-card-chosen"
      class="flex flex-col gap-2 min-h-[50px]"
      @change="handleChange"
      @add="handleAdd"
      @remove="handleRemove"
      @update="handleUpdate"
    >
      <div v-for="(card, index) in cards" :key="card.id">
        <slot name="card" :card="card" :index="index">
          <div>{{ card }}</div>
        </slot>
      </div>
    </VueDraggable>
  </div>
</template>

<style>
.kanban-card-ghost {
  opacity: 0.5;
  background: rgb(161 161 170 / 0.2) !important;
}

.kanban-card-drag {
  opacity: 1 !important;
  cursor: grabbing !important;
}

.kanban-card-chosen {
  cursor: grabbing !important;
}
</style>
