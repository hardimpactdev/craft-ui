import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { useToast } from '@/composables/useToast';
import Button from '@nuxt/ui/components/Button.vue';
import Toaster from '@/components/Toast/Toaster.vue';

const ToastDemo = defineComponent({
  name: 'ToastDemo',
  components: { Button, Toaster },
  setup() {
    const toast = useToast();

    const showDefault = () => {
      toast.add({
        title: 'Default Toast',
        description: 'This is a default toast notification.',
      });
    };

    const showSuccess = () => {
      toast.add({
        title: 'Success!',
        description: 'Your changes have been saved.',
        color: 'success',
      });
    };

    const showError = () => {
      toast.add({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        color: 'error',
      });
    };

    const showWarning = () => {
      toast.add({
        title: 'Warning',
        description: 'This action cannot be undone.',
        color: 'warning',
      });
    };

    const showInfo = () => {
      toast.add({
        title: 'Information',
        description: 'Here is some useful information.',
        color: 'info',
      });
    };

    const showWithAction = () => {
      toast.add({
        title: 'New message',
        description: 'You have received a new message.',
        actions: [
          {
            label: 'View',
            onClick: () => console.log('View clicked'),
          },
          {
            label: 'Dismiss',
            variant: 'ghost',
            onClick: () => console.log('Dismiss clicked'),
          },
        ],
      });
    };

    const clearAll = () => {
      toast.clear();
    };

    return () => h('div', { class: 'space-y-4' }, [
      h(Toaster),
      h('div', { class: 'flex flex-wrap gap-2' }, [
        h(Button, { onClick: showDefault }, () => 'Default'),
        h(Button, { onClick: showSuccess, color: 'success' }, () => 'Success'),
        h(Button, { onClick: showError, color: 'error' }, () => 'Error'),
        h(Button, { onClick: showWarning, color: 'warning' }, () => 'Warning'),
        h(Button, { onClick: showInfo, color: 'info' }, () => 'Info'),
      ]),
      h('div', { class: 'flex gap-2 mt-4' }, [
        h(Button, { onClick: showWithAction, variant: 'outline' }, () => 'With Actions'),
        h(Button, { onClick: clearAll, variant: 'ghost' }, () => 'Clear All'),
      ]),
    ]);
  },
});

const meta: Meta = {
  title: 'Nuxt UI/Composables/useToast',
  component: ToastDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`useToast\` composable provides a way to display toast notifications in your app.

## Usage

\`\`\`ts
import { useToast } from '@hardimpactdev/liftoff-vue';

const toast = useToast();

// Show a toast
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
    { label: 'View', onClick: () => {} },
  ],
});

// Clear all toasts
toast.clear();
\`\`\`

## Important

Add the \`<Toaster />\` component to your app layout (usually in App.vue or a layout component).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    components: { ToastDemo },
    template: '<ToastDemo />',
  }),
};
