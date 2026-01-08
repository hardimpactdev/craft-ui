<script setup lang="ts">
import Button from '@nuxt/ui/components/Button.vue';
import CommandPalette from '@nuxt/ui/components/CommandPalette.vue';
import Icon from '@/components/Icon.vue';
import { computed, ref} from 'vue';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  kbd?: string | string[];
  description?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  id: string;
  label?: string;
  items: CommandItem[];
}

interface Props {
  groups: CommandGroup[];
  placeholder?: string;
  icon?: string;
  modelValue?: CommandItem | null;
  clearable?: boolean;
  closable?: boolean;
  loading?: boolean;
  emptyText?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  icon: 'i-lucide-search',
  emptyText: 'No results found',
  clearable: false,
  closable: false,
  loading: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: CommandItem | null];
  'select': [item: CommandItem];
  'close': [];
}>();

const searchTerm = ref('');

// Transform groups to Nuxt UI CommandPalette format
const nuxtGroups = computed(() => {
  return props.groups.map(group => ({
    id: group.id,
    label: group.label,
    items: group.items.map(item => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      suffix: item.description,
      kbds: item.kbd ? (Array.isArray(item.kbd) ? item.kbd : [item.kbd]) : undefined,
      disabled: item.disabled,
      onSelect: () => {
        emit('select', item);
        emit('update:modelValue', item);
        item.onSelect?.();
      },
    })),
  }));
});

function handleClose() {
  emit('close');
}

function handleClear() {
  searchTerm.value = '';
}
</script>

<template>
  <div
    :class="cn(
      'w-full max-w-lg rounded-lg border border-zinc-200 bg-white shadow-lg',
      'dark:border-zinc-700 dark:bg-zinc-800',
      props.class
    )"
  >
    <!-- Search Input -->
    <div
      data-liftoff-command-input
      class="flex items-center border-b border-zinc-200 px-3 dark:border-zinc-700"
    >
      <Icon
        :name="props.icon"
        class="h-5 w-5 shrink-0 text-zinc-400"
        aria-hidden="true"
      />
      <input
        v-model="searchTerm"
        type="text"
        :placeholder="props.placeholder"
        aria-label="Search commands"
        class="h-12 w-full flex-1 bg-transparent px-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:placeholder:text-zinc-500"
      />
      <div class="flex items-center gap-1">
        <Button
          v-if="props.clearable && searchTerm"
          size="xs"
          variant="ghost"
          icon="i-lucide-x"
          aria-label="Clear search"
          class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          @click="handleClear"
        />
        <Button
          v-if="props.closable"
          size="xs"
          variant="ghost"
          icon="i-lucide-x"
          aria-label="Close"
          class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          @click="handleClose"
        />
        <div
          v-if="props.loading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600"
        />
      </div>
    </div>

    <!-- Results -->
    <CommandPalette
      :groups="nuxtGroups"
      :placeholder="props.placeholder"
      :loading="props.loading"
      :search-term="searchTerm"
      :ui="{
        input: 'hidden',
        container: 'max-h-[20rem]',
        group: 'p-1.5',
        label: 'px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400',
        item: 'group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm font-medium text-zinc-800 dark:text-white data-[active]:bg-zinc-100 dark:data-[active]:bg-zinc-700',
        itemLeadingIcon: 'h-4 w-4 text-zinc-500 dark:text-zinc-400',
        empty: 'p-4 text-center text-sm text-zinc-500 dark:text-zinc-400',
      }"
    >
      <template #empty>
        <div class="p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {{ props.emptyText }}
        </div>
      </template>
    </CommandPalette>
  </div>
</template>
