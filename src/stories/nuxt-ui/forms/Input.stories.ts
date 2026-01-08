import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Input from '@nuxt/ui/components/Input.vue';
import FormField from '@nuxt/ui/components/FormField.vue';

const meta: Meta<typeof Input> = {
  title: 'Nuxt UI/Forms/Input',
  component: Input,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" aria-label="Text input" />`,
  }),
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" placeholder="Enter your text here..." aria-label="Text input" />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Input, FormField },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField label="Email address" name="email">
        <Input v-model="value" placeholder="email@example.com" />
      </FormField>
    `,
  }),
};

export const WithLeadingIcon: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" placeholder="Search..." icon="i-lucide-search" aria-label="Search" />`,
  }),
};

export const WithTrailingIcon: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" placeholder="Enter email..." trailing-icon="i-lucide-mail" aria-label="Email" />`,
  }),
};

export const WithLeadingAndTrailingIcon: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" placeholder="Search users..." icon="i-lucide-search" trailing-icon="i-lucide-users" aria-label="Search users" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('Disabled input');
      return { value };
    },
    template: `<Input v-model="value" disabled aria-label="Disabled input" />`,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { Input, FormField },
    setup() {
      const value = ref('invalid@email');
      return { value };
    },
    template: `
      <FormField label="Email" name="email" error="Please enter a valid email address">
        <Input v-model="value" placeholder="email@example.com" />
      </FormField>
    `,
  }),
};

export const SizeSmall: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" size="sm" placeholder="Small input" aria-label="Small input" />`,
  }),
};

export const SizeMedium: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" size="md" placeholder="Medium input" aria-label="Medium input" />`,
  }),
};

export const SizeLarge: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" size="lg" placeholder="Large input" aria-label="Large input" />`,
  }),
};

export const SizeXLarge: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" size="xl" placeholder="Extra large input" aria-label="Extra large input" />`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Input v-model="value" size="xs" placeholder="Extra small (xs)" aria-label="Extra small input" />
        <Input v-model="value" size="sm" placeholder="Small (sm)" aria-label="Small input" />
        <Input v-model="value" size="md" placeholder="Medium (md)" aria-label="Medium input" />
        <Input v-model="value" size="lg" placeholder="Large (lg)" aria-label="Large input" />
        <Input v-model="value" size="xl" placeholder="Extra large (xl)" aria-label="Extra large input" />
      </div>
    `,
  }),
};

export const TypeText: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" type="text" placeholder="Text input" aria-label="Text input" />`,
  }),
};

export const TypeEmail: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" type="email" placeholder="email@example.com" icon="i-lucide-mail" aria-label="Email" />`,
  }),
};

export const TypePassword: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" type="password" placeholder="Enter password" icon="i-lucide-lock" aria-label="Password" />`,
  }),
};

export const TypeNumber: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Input v-model="value" type="number" placeholder="Enter a number" aria-label="Number" />`,
  }),
};

export const Types: Story = {
  render: () => ({
    components: { Input, FormField },
    setup() {
      const text = ref('');
      const email = ref('');
      const password = ref('');
      const number = ref('');
      return { text, email, password, number };
    },
    template: `
      <div class="flex flex-col gap-4">
        <FormField label="Text" name="text">
          <Input v-model="text" type="text" placeholder="Text input" />
        </FormField>
        <FormField label="Email" name="email">
          <Input v-model="email" type="email" placeholder="email@example.com" />
        </FormField>
        <FormField label="Password" name="password">
          <Input v-model="password" type="password" placeholder="Enter password" />
        </FormField>
        <FormField label="Number" name="number">
          <Input v-model="number" type="number" placeholder="Enter a number" />
        </FormField>
      </div>
    `,
  }),
};
