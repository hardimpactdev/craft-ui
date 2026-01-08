import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Slider from '@nuxt/ui/components/Slider.vue';

const meta: Meta<typeof Slider> = {
  title: 'Nuxt UI/Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50]);
      return { value };
    },
    template: `
      <div class="w-64">
        <Slider v-model="value" aria-label="Volume" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value[0] }}</p>
      </div>
    `,
  }),
};

export const WithMinMax: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([25]);
      return { value };
    },
    template: `
      <div class="w-64">
        <Slider v-model="value" :min="0" :max="100" aria-label="Percentage" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value[0] }} (min: 0, max: 100)</p>
      </div>
    `,
  }),
};

export const WithStep: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50]);
      return { value };
    },
    template: `
      <div class="w-64">
        <Slider v-model="value" :step="10" aria-label="Value in steps of 10" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value[0] }} (step: 10)</p>
      </div>
    `,
  }),
};

export const Range: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([25, 75]);
      return { value };
    },
    template: `
      <div class="w-64">
        <Slider v-model="value" aria-label="Price range" />
        <p class="mt-2 text-sm text-muted-foreground">Range: {{ value[0] }} - {{ value[1] }}</p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([50]);
      return { value };
    },
    template: `
      <div class="w-64">
        <Slider v-model="value" disabled aria-label="Disabled slider" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value[0] }} (disabled)</p>
      </div>
    `,
  }),
};
