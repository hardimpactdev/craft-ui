import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RadioGroup from '@nuxt/ui/components/RadioGroup.vue';

const meta: Meta<typeof RadioGroup> = {
  title: 'Nuxt UI/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('1');
      return { value, options };
    },
    template: `
      <RadioGroup v-model="value" :items="options" aria-label="Select an option" />
    `,
  }),
};

export const WithOptions: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('2');
      const extendedOptions = [
        { label: 'Email notifications', value: 'email', description: 'Receive updates via email' },
        { label: 'SMS notifications', value: 'sms', description: 'Receive updates via text message' },
        { label: 'Push notifications', value: 'push', description: 'Receive updates via push notifications' },
        { label: 'No notifications', value: 'none', description: 'Do not receive any notifications' },
      ];
      return { value, extendedOptions };
    },
    template: `
      <RadioGroup v-model="value" :items="extendedOptions" aria-label="Notification preferences" />
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('1');
      return { value, options };
    },
    template: `
      <RadioGroup v-model="value" :items="options" orientation="horizontal" aria-label="Select an option" />
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('1');
      return { value, options };
    },
    template: `
      <RadioGroup v-model="value" :items="options" disabled aria-label="Disabled options" />
    `,
  }),
};
