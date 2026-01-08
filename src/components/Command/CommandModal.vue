<script setup lang="ts">
import Modal from '@nuxt/ui/components/Modal.vue';
import { ref, watch, computed } from 'vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import Command from './Command.vue';
import type { CommandGroup, CommandItem } from './Command.vue';

interface Props {
  groups: CommandGroup[];
  placeholder?: string;
  open?: boolean;
  shortcut?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  open: false,
  shortcut: () => ['Meta', 'k'],
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  'select': [item: CommandItem];
}>();

const isOpen = ref(props.open);

// Sync with prop
watch(() => props.open, (value) => {
  isOpen.value = value;
});

// Keyboard shortcut to open
const keys = useMagicKeys();

// Watch for Cmd/Ctrl + K
const shortcutPressed = computed(() => {
  const modifier = props.shortcut.find(k => k === 'Meta' || k === 'Control');
  const key = props.shortcut.find(k => k !== 'Meta' && k !== 'Control');

  if (modifier === 'Meta' && keys.meta?.value && key) {
    return keys[key.toLowerCase()]?.value ?? false;
  }
  if (modifier === 'Control' && keys.ctrl?.value && key) {
    return keys[key.toLowerCase()]?.value ?? false;
  }
  return false;
});

whenever(shortcutPressed, () => {
  isOpen.value = true;
  emit('update:open', true);
});

// Close on Escape
const escapePressed = computed(() => keys.escape?.value ?? false);

whenever(escapePressed, () => {
  if (isOpen.value) {
    isOpen.value = false;
    emit('update:open', false);
  }
});

function handleClose() {
  isOpen.value = false;
  emit('update:open', false);
}

function handleSelect(item: CommandItem) {
  emit('select', item);
  handleClose();
}
</script>

<template>
  <Modal
    v-model:open="isOpen"
    :ui="{
      content: 'p-0 max-w-lg',
      overlay: 'bg-zinc-950/50',
    }"
    @update:open="emit('update:open', $event)"
  >
    <Command
      :groups="groups"
      :placeholder="placeholder"
      closable
      @close="handleClose"
      @select="handleSelect"
    />
  </Modal>
</template>
