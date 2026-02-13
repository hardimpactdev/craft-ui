import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';

const Welcome = defineComponent({
  name: 'Welcome',
  render() {
    return h('div', { class: 'p-8 space-y-6' }, [
      h('h1', { class: 'text-3xl font-bold' }, 'Craft UI'),
      h('p', { class: 'text-muted-foreground' },
        'A UI library for Laravel + Inertia + Vue applications, built with Reka UI and shadcn-vue.'
      ),
      h('div', { class: 'space-y-4' }, [
        h('h2', { class: 'text-xl font-semibold' }, 'Features'),
        h('ul', { class: 'list-disc list-inside space-y-1 text-muted-foreground' }, [
          h('li', 'Reka UI primitives for accessibility'),
          h('li', 'shadcn-vue styling patterns'),
          h('li', 'Custom sidebar and navigation components'),
          h('li', 'Vite plugin with Laravel + Inertia integration'),
          h('li', 'Composables for appearance, language, and more'),
          h('li', 'Utility functions (cn, __, can)'),
        ]),
      ]),
      h('div', { class: 'pt-4' }, [
        h('a', {
          href: 'https://reka-ui.com',
          target: '_blank',
          class: 'text-primary hover:underline'
        }, 'View Reka UI Documentation'),
      ]),
    ]);
  }
});

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
