import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Separator from '@nuxt/ui/components/Separator.vue';
import Button from '@nuxt/ui/components/Button.vue';
import Input from '@nuxt/ui/components/Input.vue';

const meta: Meta<typeof Separator> = {
  title: 'Nuxt UI/Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator',
    },
    label: {
      control: 'text',
      description: 'Text label to show in the separator',
    },
    icon: {
      control: 'text',
      description: 'Icon to show in the separator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => ({
    components: { Separator },
    render() {
      return h('div', { class: 'w-full max-w-md' }, [
        h('p', { class: 'text-sm mb-4' }, 'Content above the separator'),
        h(Separator),
        h('p', { class: 'text-sm mt-4' }, 'Content below the separator'),
      ]);
    },
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Separator },
    render() {
      return h('div', { class: 'w-full max-w-md' }, [
        h('p', { class: 'text-sm mb-4' }, 'Content above'),
        h(Separator, { label: 'OR' }),
        h('p', { class: 'text-sm mt-4' }, 'Content below'),
      ]);
    },
  }),
};

export const WithIcon: Story = {
  render: () => ({
    components: { Separator },
    render() {
      return h('div', { class: 'w-full max-w-md' }, [
        h('p', { class: 'text-sm mb-4' }, 'Social login options'),
        h(Separator, { icon: 'i-lucide-mail' }),
        h('p', { class: 'text-sm mt-4' }, 'Email login below'),
      ]);
    },
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { Separator },
    render() {
      return h('div', { class: 'flex items-center h-16 gap-4' }, [
        h('span', 'Left content'),
        h(Separator, { orientation: 'vertical' }),
        h('span', 'Middle content'),
        h(Separator, { orientation: 'vertical' }),
        h('span', 'Right content'),
      ]);
    },
  }),
};

export const InForm: Story = {
  render: () => ({
    components: { Separator, Button, Input },
    render() {
      return h('div', { class: 'w-full max-w-md space-y-4' }, [
        h('div', { class: 'space-y-4' }, [
          h(Button, { class: 'w-full', variant: 'outline' }, () => [
            h('span', { class: 'i-lucide-github w-4 h-4 mr-2' }),
            'Continue with GitHub',
          ]),
          h(Button, { class: 'w-full', variant: 'outline' }, () => [
            h('span', { class: 'i-lucide-chrome w-4 h-4 mr-2' }),
            'Continue with Google',
          ]),
        ]),
        h(Separator, { label: 'Or continue with email' }),
        h('div', { class: 'space-y-4' }, [
          h(Input, { placeholder: 'Email address', 'aria-label': 'Email address' }),
          h(Input, { type: 'password', placeholder: 'Password', 'aria-label': 'Password' }),
          h(Button, { class: 'w-full' }, () => 'Sign In'),
        ]),
      ]);
    },
  }),
};
