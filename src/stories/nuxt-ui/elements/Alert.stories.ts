import type { Meta, StoryObj } from '@storybook/vue3';
import Alert from '@nuxt/ui/components/Alert.vue';

const meta: Meta<typeof Alert> = {
  title: 'Nuxt UI/Elements/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
};

export const Colors: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <Alert color="primary" title="Primary Alert" description="This is a primary alert message." />
        <Alert color="secondary" title="Secondary Alert" description="This is a secondary alert message." />
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    title: 'Update Available',
    description: 'A new software update is available for download.',
    icon: 'i-lucide-info',
    color: 'primary',
  },
};

export const WithTitle: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    title: 'Important Notice',
    color: 'secondary',
  },
};

export const WithDescription: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    description: 'Your session will expire in 5 minutes. Please save your work.',
    color: 'secondary',
  },
};

export const WithActions: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    color: 'primary',
    actions: [
      { label: 'Confirm', color: 'primary' },
      { label: 'Cancel', variant: 'outline' },
    ],
  },
};

export const Closable: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<div class="w-full max-w-md"><Alert v-bind="args" /></div>`,
  }),
  args: {
    title: 'Dismissable Alert',
    description: 'Click the close button to dismiss this alert.',
    color: 'primary',
    close: true,
  },
};
