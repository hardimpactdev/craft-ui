import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { within, userEvent, expect, fn } from 'storybook/test';
import Button from '@nuxt/ui/components/Button.vue';
import Kbd from '@nuxt/ui/components/Kbd.vue';
import Command from './Command.vue';
import CommandModal from './CommandModal.vue';
import type { CommandGroup } from './Command.vue';

const meta: Meta<typeof Command> = {
  title: 'Components/Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A searchable command palette for quick navigation and actions. Supports keyboard shortcuts, grouping, and fuzzy search.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGroups: CommandGroup[] = [
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'new-file', label: 'New File', icon: 'i-lucide-file-plus', kbd: '⌘N' },
      { id: 'new-folder', label: 'New Folder', icon: 'i-lucide-folder-plus', kbd: '⌘⇧N' },
      { id: 'save', label: 'Save', icon: 'i-lucide-save', kbd: '⌘S' },
      { id: 'save-all', label: 'Save All', icon: 'i-lucide-save-all', kbd: '⌘⇧S' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
      { id: 'projects', label: 'Projects', icon: 'i-lucide-folder' },
      { id: 'tasks', label: 'Tasks', icon: 'i-lucide-check-square' },
      { id: 'settings', label: 'Settings', icon: 'i-lucide-settings', kbd: '⌘,' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'docs', label: 'Documentation', icon: 'i-lucide-book-open' },
      { id: 'support', label: 'Contact Support', icon: 'i-lucide-headphones' },
    ],
  },
];

export const Default: Story = {
  render: (args) => ({
    components: { Command },
    setup() {
      return { args, groups: sampleGroups };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px] flex items-start justify-center">
        <Command v-bind="args" :groups="groups" />
      </div>
    `,
  }),
  args: {
    placeholder: 'Search commands...',
    clearable: true,
  },
};

export const WithClose: Story = {
  render: (args) => ({
    components: { Command },
    setup() {
      const handleClose = () => {
        console.log('Command closed');
      };
      return { args, groups: sampleGroups, handleClose };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px] flex items-start justify-center">
        <Command v-bind="args" :groups="groups" @close="handleClose" />
      </div>
    `,
  }),
  args: {
    placeholder: 'Type a command...',
    clearable: true,
    closable: true,
  },
};

export const Loading: Story = {
  render: (args) => ({
    components: { Command },
    setup() {
      return { args, groups: sampleGroups };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px] flex items-start justify-center">
        <Command v-bind="args" :groups="groups" />
      </div>
    `,
  }),
  args: {
    placeholder: 'Searching...',
    loading: true,
  },
};

export const Modal: Story = {
  render: () => ({
    components: { CommandModal, Command, Button, Kbd },
    setup() {
      const isOpen = ref(false);
      const handleSelect = (item: any) => {
        console.log('Selected:', item);
      };
      return { isOpen, groups: sampleGroups, handleSelect };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px]">
        <p class="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open, or click the button below.
        </p>
        <Button @click="isOpen = true">
          Open Command Palette
        </Button>
        <CommandModal
          v-model:open="isOpen"
          :groups="groups"
          placeholder="What do you need?"
          @select="handleSelect"
        />
      </div>
    `,
  }),
};

export const CustomActions: Story = {
  render: () => ({
    components: { Command },
    setup() {
      const actionLog = ref<string[]>([]);
      const groups: CommandGroup[] = [
        {
          id: 'actions',
          label: 'Quick Actions',
          items: [
            {
              id: 'copy',
              label: 'Copy to clipboard',
              icon: 'i-lucide-copy',
              kbd: '⌘C',
              onSelect: () => {
                actionLog.value.push('Copied!');
              },
            },
            {
              id: 'paste',
              label: 'Paste from clipboard',
              icon: 'i-lucide-clipboard',
              kbd: '⌘V',
              onSelect: () => {
                actionLog.value.push('Pasted!');
              },
            },
            {
              id: 'delete',
              label: 'Delete item',
              icon: 'i-lucide-trash-2',
              kbd: '⌫',
              onSelect: () => {
                actionLog.value.push('Deleted!');
              },
            },
          ],
        },
      ];
      return { groups, actionLog };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px]">
        <div class="flex gap-8">
          <Command :groups="groups" placeholder="Try an action..." />
          <div class="flex-1">
            <h3 class="font-medium text-zinc-900 dark:text-white mb-2">Action Log:</h3>
            <ul class="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <li v-for="(log, i) in actionLog" :key="i">{{ log }}</li>
              <li v-if="!actionLog.length" class="italic">No actions yet...</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
};

export const SearchInteraction: Story = {
  render: (args) => ({
    components: { Command },
    setup() {
      return { args, groups: sampleGroups };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px] flex items-start justify-center">
        <Command v-bind="args" :groups="groups" />
      </div>
    `,
  }),
  args: {
    placeholder: 'Search commands...',
    clearable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the visible search input (first one in the custom input area)
    const searchInputs = canvas.getAllByPlaceholderText('Search commands...');
    const searchInput = searchInputs[0];
    await expect(searchInput).toBeInTheDocument();

    // Type a search query
    await userEvent.type(searchInput, 'save');

    // Verify the search input has the typed value
    await expect(searchInput).toHaveValue('save');

    // Clear the input
    await userEvent.clear(searchInput);
    await expect(searchInput).toHaveValue('');
  },
};

export const KeyboardNavigation: Story = {
  render: (args) => ({
    components: { Command },
    setup() {
      return { args, groups: sampleGroups };
    },
    template: `
      <div class="p-8 bg-zinc-100 dark:bg-zinc-900 min-h-[400px] flex items-start justify-center">
        <Command v-bind="args" :groups="groups" />
      </div>
    `,
  }),
  args: {
    placeholder: 'Use arrow keys...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the visible search input (first one in the custom input area)
    const searchInputs = canvas.getAllByPlaceholderText('Use arrow keys...');
    const searchInput = searchInputs[0];
    await expect(searchInput).toBeInTheDocument();

    // Focus the input
    await userEvent.click(searchInput);

    // Verify initial items are visible
    await expect(canvas.getByText('New File')).toBeInTheDocument();
    await expect(canvas.getByText('Dashboard')).toBeInTheDocument();
  },
};
