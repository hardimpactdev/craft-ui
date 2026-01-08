import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Accordion from '@nuxt/ui/components/Accordion.vue';

const items = [
  { label: 'Getting Started', content: 'Learn how to get started with our platform.' },
  { label: 'Installation', content: 'Step by step installation guide.' },
  { label: 'Configuration', content: 'Configure your settings here.' },
];

const meta: Meta<typeof Accordion> = {
  title: 'Nuxt UI/Data/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of accordion items with label and content',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open at once',
    },
    defaultValue: {
      control: 'text',
      description: 'Default open item value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(
            Accordion,
            { items },
          ),
        ]);
    },
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(
            Accordion,
            {
              items,
              multiple: true,
            },
          ),
        ]);
    },
  }),
};

export const WithDefaultOpen: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-md' }, [
          h(
            Accordion,
            {
              items,
              defaultValue: 'Getting Started',
            },
          ),
        ]);
    },
  }),
};
