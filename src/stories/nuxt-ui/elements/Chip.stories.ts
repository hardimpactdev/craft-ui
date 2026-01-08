import type { Meta, StoryObj } from '@storybook/vue3';
import Chip from '@nuxt/ui/components/Chip.vue';
import Avatar from '@nuxt/ui/components/Avatar.vue';

const meta: Meta<typeof Chip> = {
  title: 'Nuxt UI/Elements/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: (args) => ({
    components: { Chip, Avatar },
    setup() {
      return { args };
    },
    template: `
      <div class="p-8">
        <Chip v-bind="args">
          <Avatar src="https://github.com/nuxt.png" alt="Avatar" />
        </Chip>
      </div>
    `,
  }),
  args: {
    show: true,
  },
};

export const Colors: Story = {
  render: () => ({
    components: { Chip, Avatar },
    template: `
      <div class="flex flex-wrap gap-8 p-4">
        <div v-for="color in ['primary', 'secondary', 'neutral']" :key="color" class="flex flex-col items-center gap-2">
          <Chip :color="color">
            <Avatar src="https://github.com/nuxt.png" alt="Avatar" />
          </Chip>
          <span class="text-xs text-muted-foreground">{{ color }}</span>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Chip, Avatar },
    template: `
      <div class="flex flex-wrap items-end gap-8 p-4">
        <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" class="flex flex-col items-center gap-2">
          <Chip :size="size">
            <Avatar src="https://github.com/nuxt.png" alt="Avatar" />
          </Chip>
          <span class="text-xs text-muted-foreground">{{ size }}</span>
        </div>
      </div>
    `,
  }),
};

export const WithText: Story = {
  render: (args) => ({
    components: { Chip, Avatar },
    setup() {
      return { args };
    },
    template: `
      <div class="p-8">
        <Chip v-bind="args">
          <Avatar src="https://github.com/nuxt.png" alt="Avatar" />
        </Chip>
      </div>
    `,
  }),
  args: {
    text: '5',
    color: 'primary',
  },
};

export const Positions: Story = {
  render: () => ({
    components: { Chip, Avatar },
    template: `
      <div class="flex flex-wrap gap-12 p-8">
        <div v-for="position in ['top-right', 'bottom-right', 'top-left', 'bottom-left']" :key="position" class="flex flex-col items-center gap-2">
          <Chip :position="position" color="primary">
            <Avatar src="https://github.com/nuxt.png" alt="Avatar" />
          </Chip>
          <span class="text-xs text-muted-foreground">{{ position }}</span>
        </div>
      </div>
    `,
  }),
};
