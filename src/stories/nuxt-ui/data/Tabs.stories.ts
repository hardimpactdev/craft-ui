import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Tabs from '@nuxt/ui/components/Tabs.vue';

const tabItems = [
  {
    label: 'Account',
    value: 'account',
    content: 'Manage your account settings and preferences.',
  },
  {
    label: 'Password',
    value: 'password',
    content: 'Change your password and security settings.',
  },
  {
    label: 'Notifications',
    value: 'notifications',
    content: 'Configure your notification preferences.',
  },
];

const tabItemsWithIcons = [
  {
    label: 'Account',
    value: 'account',
    icon: 'i-lucide-user',
    content: 'Manage your account settings and preferences.',
  },
  {
    label: 'Password',
    value: 'password',
    icon: 'i-lucide-lock',
    content: 'Change your password and security settings.',
  },
  {
    label: 'Notifications',
    value: 'notifications',
    icon: 'i-lucide-bell',
    content: 'Configure your notification preferences.',
  },
];

const tabItemsWithDisabled = [
  {
    label: 'Account',
    value: 'account',
    content: 'Manage your account settings and preferences.',
  },
  {
    label: 'Password',
    value: 'password',
    content: 'Change your password and security settings.',
  },
  {
    label: 'Notifications',
    value: 'notifications',
    disabled: true,
    content: 'Configure your notification preferences.',
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'Nuxt UI/Data/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tab items',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected tab',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(Tabs, {
            items: tabItems,
            defaultValue: 'account',
          }),
        ]);
    },
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(Tabs, {
            items: tabItemsWithIcons,
            defaultValue: 'account',
          }),
        ]);
    },
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(Tabs, {
            items: tabItems,
            orientation: 'vertical',
            defaultValue: 'account',
          }),
        ]);
    },
  }),
};

export const DisabledTab: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(Tabs, {
            items: tabItemsWithDisabled,
            defaultValue: 'account',
          }),
        ]);
    },
  }),
};
