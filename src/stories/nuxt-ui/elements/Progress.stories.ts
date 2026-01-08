import type { Meta, StoryObj } from '@storybook/vue3';
import Progress from '@nuxt/ui/components/Progress.vue';
import { ref } from 'vue';

const meta: Meta<typeof Progress> = {
  title: 'Nuxt UI/Elements/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    animation: {
      control: 'select',
      options: ['carousel', 'carousel-inverse', 'swing', 'elastic'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Progress v-bind="args" /></div>`,
  }),
  args: {
    modelValue: 50,
  },
};

export const WithValue: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Progress v-bind="args" /></div>`,
  }),
  args: {
    modelValue: 75,
    status: true,
  },
};

export const Indeterminate: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="w-full max-w-md">
        <Progress :model-value="null" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <div v-for="color in ['primary', 'secondary', 'neutral']" :key="color" class="space-y-1">
          <span class="text-sm text-muted-foreground">{{ color }}</span>
          <Progress :model-value="60" :color="color" />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <div v-for="size in ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']" :key="size" class="space-y-1">
          <span class="text-sm text-muted-foreground">{{ size }}</span>
          <Progress :model-value="60" :size="size" />
        </div>
      </div>
    `,
  }),
};

export const Animations: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <div v-for="animation in ['carousel', 'carousel-inverse', 'swing', 'elastic']" :key="animation" class="space-y-1">
          <span class="text-sm text-muted-foreground">{{ animation }}</span>
          <Progress :model-value="null" :animation="animation" />
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { Progress },
    setup() {
      const value = ref(0);
      setInterval(() => {
        value.value = value.value >= 100 ? 0 : value.value + 10;
      }, 500);
      return { value };
    },
    template: `
      <div class="space-y-2 w-full max-w-md">
        <Progress :model-value="value" :status="true" color="primary" />
        <p class="text-sm text-muted-foreground">Progress updates every 500ms</p>
      </div>
    `,
  }),
};
