import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import FormField from '@nuxt/ui/components/FormField.vue';
import Input from '@nuxt/ui/components/Input.vue';

const meta: Meta<typeof FormField> = {
  title: 'Nuxt UI/Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => ({
    components: { FormField, Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField name="default" label="Default field">
        <Input v-model="value" placeholder="Enter text..." />
      </FormField>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { FormField, Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField name="email" label="Email address">
        <Input v-model="value" type="email" placeholder="you@example.com" />
      </FormField>
    `,
  }),
};

export const WithDescription: Story = {
  render: () => ({
    components: { FormField, Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField
        name="username"
        label="Username"
        description="This will be your public display name."
      >
        <Input v-model="value" placeholder="johndoe" />
      </FormField>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { FormField, Input },
    setup() {
      const value = ref('invalid-email');
      return { value };
    },
    template: `
      <FormField
        name="email"
        label="Email"
        error="Please enter a valid email address."
      >
        <Input v-model="value" type="email" />
      </FormField>
    `,
  }),
};

export const Required: Story = {
  render: () => ({
    components: { FormField, Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField
        name="fullname"
        label="Full name"
        required
        description="Enter your legal name as it appears on official documents."
      >
        <Input v-model="value" placeholder="John Doe" />
      </FormField>
    `,
  }),
};
