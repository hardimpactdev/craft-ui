import type { Meta, StoryObj } from '@storybook/vue3';
import Kbd from '@nuxt/ui/components/Kbd.vue';

const meta: Meta<typeof Kbd> = {
  title: 'Nuxt UI/Elements/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: (args) => ({
    components: { Kbd },
    setup() {
      return { args };
    },
    template: `<Kbd v-bind="args" />`,
  }),
  args: {
    value: 'K',
  },
};

export const Combinations: Story = {
  render: () => ({
    components: { Kbd },
    setup() {
      const shortcuts = [
        { keys: ['meta', 'K'], label: 'Command palette' },
        { keys: ['meta', 'C'], label: 'Copy' },
        { keys: ['meta', 'V'], label: 'Paste' },
        { keys: ['meta', 'Z'], label: 'Undo' },
        { keys: ['meta', 'shift', 'Z'], label: 'Redo' },
        { keys: ['meta', 'S'], label: 'Save' },
        { keys: ['ctrl', 'alt', 'delete'], label: 'Task manager' },
        { keys: ['Esc'], label: 'Escape' },
        { keys: ['Enter'], label: 'Enter' },
        { keys: ['Tab'], label: 'Tab' },
      ];
      return { shortcuts };
    },
    template: `
      <div class="space-y-4">
        <div v-for="shortcut in shortcuts" :key="shortcut.label" class="flex items-center gap-4">
          <div class="flex items-center gap-1">
            <template v-for="(key, index) in shortcut.keys" :key="key">
              <Kbd :value="key" />
              <span v-if="index < shortcut.keys.length - 1" class="text-muted-foreground">+</span>
            </template>
          </div>
          <span class="text-sm text-muted-foreground">{{ shortcut.label }}</span>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex items-end gap-4">
        <div v-for="size in ['sm', 'md', 'lg']" :key="size" class="flex flex-col items-center gap-2">
          <Kbd value="K" :size="size" />
          <span class="text-xs text-muted-foreground">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex items-center gap-4">
        <div v-for="variant in ['outline', 'soft', 'subtle', 'solid']" :key="variant" class="flex flex-col items-center gap-2">
          <Kbd value="K" :variant="variant" />
          <span class="text-xs text-muted-foreground">{{ variant }}</span>
        </div>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <div v-for="color in ['primary', 'secondary', 'neutral']" :key="color" class="flex flex-col items-center gap-2">
          <Kbd value="K" :color="color" variant="solid" />
          <span class="text-xs text-muted-foreground">{{ color }}</span>
        </div>
      </div>
    `,
  }),
};
