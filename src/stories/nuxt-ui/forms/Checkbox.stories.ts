import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Checkbox from '@nuxt/ui/components/Checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Nuxt UI/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Default checkbox" />`,
  }),
};

export const Checked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Checked checkbox" />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Accept terms and conditions" />`,
  }),
};

export const WithDescription: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Email notifications" description="Receive email updates about your account." />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Disabled checkbox" disabled />`,
  }),
};

export const DisabledChecked: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Disabled and checked" disabled />`,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref('indeterminate');
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="Indeterminate state" />`,
  }),
};

export const Required: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<Checkbox v-model="checked" label="I agree to the privacy policy" required />`,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked1 = ref(true);
      const checked2 = ref(true);
      return { checked1, checked2 };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Checkbox v-model="checked1" label="Primary" color="primary" />
        <Checkbox v-model="checked2" label="Secondary" color="secondary" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true);
      return { checked };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Checkbox v-model="checked" label="Extra small (xs)" size="xs" />
        <Checkbox v-model="checked" label="Small (sm)" size="sm" />
        <Checkbox v-model="checked" label="Medium (md)" size="md" />
        <Checkbox v-model="checked" label="Large (lg)" size="lg" />
        <Checkbox v-model="checked" label="Extra large (xl)" size="xl" />
      </div>
    `,
  }),
};

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const options = ref(['apple', 'orange']);
      return { options };
    },
    template: `
      <div class="flex flex-col gap-2">
        <Checkbox v-model="options" value="apple" label="Apple" />
        <Checkbox v-model="options" value="banana" label="Banana" />
        <Checkbox v-model="options" value="orange" label="Orange" />
        <Checkbox v-model="options" value="grape" label="Grape" />
        <p class="mt-2 text-sm text-muted-foreground">Selected: {{ options.join(', ') }}</p>
      </div>
    `,
  }),
};
