import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import { useToast } from '@/composables/useToast';
import Button from '@nuxt/ui/components/Button.vue';
import Toaster from '@/components/Toast/Toaster.vue';

const ToasterDemo = defineComponent({
  name: 'ToasterDemo',
  components: { Button, Toaster },
  props: {
    position: {
      type: String as () => 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
      default: 'bottom-right',
    },
    expand: { type: Boolean, default: true },
    progress: { type: Boolean, default: true },
  },
  setup(props) {
    const toast = useToast();
    const counter = ref(0);

    const showToast = () => {
      counter.value++;
      toast.add({
        title: `Toast #${counter.value}`,
        description: `This toast appears at ${props.position}`,
        color: ['primary', 'success', 'warning', 'error', 'info'][counter.value % 5] as any,
      });
    };

    const showMultiple = () => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          counter.value++;
          toast.add({
            title: `Toast #${counter.value}`,
            description: 'Multiple toasts stack together',
            color: ['primary', 'success', 'info'][i] as any,
          });
        }, i * 200);
      }
    };

    const showWithProgress = () => {
      counter.value++;
      toast.add({
        title: 'Processing...',
        description: 'This toast has a progress indicator',
        color: 'info',
        duration: 5000,
      });
    };

    const showWithActions = () => {
      counter.value++;
      toast.add({
        title: 'New notification',
        description: 'You have a new message from the team',
        actions: [
          {
            label: 'View',
            onClick: () => {
              toast.add({ title: 'Viewing message...', color: 'success' });
            },
          },
          {
            label: 'Dismiss',
            variant: 'ghost',
          },
        ],
      });
    };

    const clearAll = () => {
      toast.clear();
    };

    return () => h('div', { class: 'min-h-[400px] relative' }, [
      // Toaster with configurable props
      h(Toaster, {
        position: props.position,
        expand: props.expand,
        progress: props.progress,
      }),

      // Controls
      h('div', { class: 'space-y-4' }, [
        h('div', { class: 'p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg' }, [
          h('p', { class: 'text-sm text-zinc-600 dark:text-zinc-400 mb-2' },
            `Toasts will appear at: ${props.position}`),
          h('p', { class: 'text-xs text-zinc-500' }, [
            `Expand: ${props.expand ? 'Yes' : 'No'} | Progress: ${props.progress ? 'Yes' : 'No'}`,
          ]),
        ]),

        h('div', { class: 'flex flex-wrap gap-2' }, [
          h(Button, { onClick: showToast }, () => 'Show Toast'),
          h(Button, { onClick: showMultiple, variant: 'outline' }, () => 'Show Multiple'),
          h(Button, { onClick: showWithProgress, variant: 'outline' }, () => 'With Progress'),
          h(Button, { onClick: showWithActions, variant: 'outline' }, () => 'With Actions'),
        ]),

        h('div', { class: 'flex gap-2' }, [
          h(Button, { onClick: clearAll, variant: 'ghost', color: 'error' }, () => 'Clear All'),
        ]),
      ]),
    ]);
  },
});

const meta: Meta<typeof Toaster> = {
  title: 'Nuxt UI/Overlays/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Position of the toaster on screen',
    },
    expand: {
      control: 'boolean',
      description: 'Expand toasts to show multiple at once',
    },
    progress: {
      control: 'boolean',
      description: 'Show progress bar on toasts',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The \`Toaster\` component displays toast notifications in your app. It works with the \`useToast\` composable.

## Setup

Add the Toaster to your app layout (usually in \`App.vue\` or a layout component):

\`\`\`vue
<template>
  <div>
    <Toaster />
    <RouterView />
  </div>
</template>

<script setup>
import { Toaster } from '@hardimpactdev/liftoff-vue';
</script>
\`\`\`

## Using Toasts

\`\`\`ts
import { useToast } from '@hardimpactdev/liftoff-vue';

const toast = useToast();

// Simple toast
toast.add({
  title: 'Success!',
  description: 'Your changes have been saved.',
  color: 'success',
});

// With actions
toast.add({
  title: 'New message',
  description: 'You have a new message.',
  actions: [
    { label: 'View', onClick: () => viewMessage() },
    { label: 'Dismiss', variant: 'ghost' },
  ],
});

// Clear all
toast.clear();
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | string | 'bottom-right' | Position on screen |
| expand | boolean | true | Show multiple toasts expanded |
| progress | boolean | true | Show progress indicator |
| max | number | 5 | Maximum toasts visible |
| duration | number | 5000 | Auto-dismiss time in ms |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => ({
    components: { ToasterDemo },
    setup() {
      return { args };
    },
    template: '<ToasterDemo v-bind="args" />',
  }),
  args: {
    position: 'bottom-right',
    expand: true,
    progress: true,
  },
};

export const TopRight: Story = {
  render: (args) => ({
    components: { ToasterDemo },
    setup() {
      return { args };
    },
    template: '<ToasterDemo v-bind="args" />',
  }),
  args: {
    position: 'top-right',
    expand: true,
    progress: true,
  },
};

export const TopCenter: Story = {
  render: (args) => ({
    components: { ToasterDemo },
    setup() {
      return { args };
    },
    template: '<ToasterDemo v-bind="args" />',
  }),
  args: {
    position: 'top-center',
    expand: true,
    progress: true,
  },
};

export const Collapsed: Story = {
  render: (args) => ({
    components: { ToasterDemo },
    setup() {
      return { args };
    },
    template: '<ToasterDemo v-bind="args" />',
  }),
  args: {
    position: 'bottom-right',
    expand: false,
    progress: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When `expand` is false, multiple toasts stack on top of each other with a subtle offset.',
      },
    },
  },
};

export const NoProgress: Story = {
  render: (args) => ({
    components: { ToasterDemo },
    setup() {
      return { args };
    },
    template: '<ToasterDemo v-bind="args" />',
  }),
  args: {
    position: 'bottom-right',
    expand: true,
    progress: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toasts without progress bars for a cleaner look.',
      },
    },
  },
};
