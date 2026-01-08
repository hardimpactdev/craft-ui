import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Switch from '@nuxt/ui/components/Switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Nuxt UI/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Toggle switch" />`,
  }),
};

export const Checked: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Checked switch" />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Enable notifications" />`,
  }),
};

export const WithDescription: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Dark mode" description="Toggle between light and dark theme." />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Disabled switch" disabled />`,
  }),
};

export const DisabledChecked: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Disabled and checked" disabled />`,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked1 = ref(true);
      const checked2 = ref(true);
      return { checked1, checked2 };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Switch v-model="checked1" label="Primary" color="primary" />
        <Switch v-model="checked2" label="Secondary" color="secondary" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Switch v-model="checked" label="Extra small (xs)" size="xs" />
        <Switch v-model="checked" label="Small (sm)" size="sm" />
        <Switch v-model="checked" label="Medium (md)" size="md" />
        <Switch v-model="checked" label="Large (lg)" size="lg" />
        <Switch v-model="checked" label="Extra large (xl)" size="xl" />
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Switch v-model="checked" label="Loading state" loading />`,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `<Switch v-model="checked" label="With icons" on-icon="i-lucide-check" off-icon="i-lucide-x" />`,
  }),
};
