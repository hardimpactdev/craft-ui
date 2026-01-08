import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Stepper from '@nuxt/ui/components/Stepper.vue';
import Button from '@nuxt/ui/components/Button.vue';

const meta: Meta<typeof Stepper> = {
  title: 'Nuxt UI/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the stepper',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of step indicators',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color scheme of the stepper',
    },
    linear: {
      control: 'boolean',
      description: 'Whether steps must be completed in order',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable step navigation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { title: 'Step 1', description: 'Create your account' },
  { title: 'Step 2', description: 'Verify your email' },
  { title: 'Step 3', description: 'Complete your profile' },
];

export const Default: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const step = ref(1);
      return { step };
    },
    render() {
      return h('div', { class: 'p-4 w-full' }, [
        h(Stepper, {
          modelValue: this.step,
          'onUpdate:modelValue': (val: number) => {
            this.step = val;
          },
          items: defaultSteps,
        }),
        h('div', { class: 'mt-4 flex gap-2' }, [
          h(Button, {
            variant: 'outline',
            disabled: this.step <= 1,
            onClick: () => {
              if (this.step > 1) this.step--;
            },
          }, () => 'Previous'),
          h(Button, {
            disabled: this.step >= defaultSteps.length,
            onClick: () => {
              if (this.step < defaultSteps.length) this.step++;
            },
          }, () => 'Next'),
        ]),
        h('p', { class: 'mt-4 text-sm text-muted' }, `Current step: ${this.step}`),
      ]);
    },
  }),
};

export const WithSteps: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const step = ref(2);
      const steps = [
        { title: 'Cart', description: 'Review your items' },
        { title: 'Shipping', description: 'Enter shipping details' },
        { title: 'Payment', description: 'Add payment method' },
        { title: 'Review', description: 'Confirm your order' },
        { title: 'Complete', description: 'Order placed' },
      ];
      return { step, steps };
    },
    render() {
      return h('div', { class: 'p-4 w-full' }, [
        h(Stepper, {
          modelValue: this.step,
          'onUpdate:modelValue': (val: number) => {
            this.step = val;
          },
          items: this.steps,
        }),
        h('div', { class: 'mt-6 p-4 border rounded-lg' }, [
          h('h3', { class: 'font-semibold' }, this.steps[this.step - 1]?.title),
          h('p', { class: 'text-sm text-muted' }, this.steps[this.step - 1]?.description),
        ]),
        h('div', { class: 'mt-4 flex gap-2' }, [
          h(Button, {
            variant: 'outline',
            disabled: this.step <= 1,
            onClick: () => {
              if (this.step > 1) this.step--;
            },
          }, () => 'Previous'),
          h(Button, {
            disabled: this.step >= this.steps.length,
            onClick: () => {
              if (this.step < this.steps.length) this.step++;
            },
          }, () => 'Next'),
        ]),
      ]);
    },
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const step = ref(2);
      const steps = [
        { title: 'Account Setup', description: 'Create your account credentials' },
        { title: 'Personal Info', description: 'Add your personal information' },
        { title: 'Preferences', description: 'Set your preferences' },
        { title: 'Confirmation', description: 'Review and confirm' },
      ];
      return { step, steps };
    },
    render() {
      return h('div', { class: 'p-4 flex gap-8' }, [
        h(Stepper, {
          modelValue: this.step,
          'onUpdate:modelValue': (val: number) => {
            this.step = val;
          },
          items: this.steps,
          orientation: 'vertical',
          class: 'min-h-[300px]',
        }),
        h('div', { class: 'flex-1' }, [
          h('div', { class: 'p-4 border rounded-lg' }, [
            h('h3', { class: 'font-semibold text-lg' }, this.steps[this.step - 1]?.title),
            h('p', { class: 'text-muted mt-2' }, this.steps[this.step - 1]?.description),
            h('p', { class: 'mt-4 text-sm' }, 'Form content for this step would go here...'),
          ]),
          h('div', { class: 'mt-4 flex gap-2' }, [
            h(Button, {
              variant: 'outline',
              disabled: this.step <= 1,
              onClick: () => {
                if (this.step > 1) this.step--;
              },
            }, () => 'Previous'),
            h(Button, {
              disabled: this.step >= this.steps.length,
              onClick: () => {
                if (this.step < this.steps.length) this.step++;
              },
            }, () => 'Next'),
          ]),
        ]),
      ]);
    },
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const step = ref(1);
      const steps = [
        { title: 'Account', description: 'Create account', icon: 'i-lucide-user' },
        { title: 'Settings', description: 'Configure settings', icon: 'i-lucide-settings' },
        { title: 'Security', description: 'Set up security', icon: 'i-lucide-shield' },
        { title: 'Done', description: 'All complete', icon: 'i-lucide-check-circle' },
      ];
      return { step, steps };
    },
    render() {
      return h('div', { class: 'p-4 w-full' }, [
        h(Stepper, {
          modelValue: this.step,
          'onUpdate:modelValue': (val: number) => {
            this.step = val;
          },
          items: this.steps,
        }),
        h('div', { class: 'mt-4 flex gap-2' }, [
          h(Button, {
            variant: 'outline',
            disabled: this.step <= 1,
            onClick: () => {
              if (this.step > 1) this.step--;
            },
          }, () => 'Previous'),
          h(Button, {
            disabled: this.step >= this.steps.length,
            onClick: () => {
              if (this.step < this.steps.length) this.step++;
            },
          }, () => 'Next'),
        ]),
        h('p', { class: 'mt-4 text-sm text-muted' }, `Current step: ${this.step}`),
      ]);
    },
  }),
};
