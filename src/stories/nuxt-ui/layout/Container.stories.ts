import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Container from '@nuxt/ui/components/Container.vue';
import Card from '@nuxt/ui/components/Card.vue';
import Link from '@nuxt/ui/components/Link.vue';

const meta: Meta<typeof Container> = {
  title: 'Nuxt UI/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => ({
    components: { Container },
    render() {
      return h(Container, { class: 'bg-muted/30 py-8' }, () => [
        h('h1', { class: 'text-2xl font-bold mb-4' }, 'Container Example'),
        h('p', { class: 'text-muted-foreground' },
          'This content is wrapped in a Container component that provides consistent max-width and horizontal padding. Resize the browser to see responsive behavior.'
        ),
      ]);
    },
  }),
};

export const WithCard: Story = {
  render: () => ({
    components: { Container, Card },
    render() {
      return h(Container, { class: 'py-8' }, () => [
        h(Card, { class: 'p-6' }, () => [
          h('template', { }, [
            h('h2', { class: 'text-xl font-semibold mb-2' }, 'Card inside Container'),
            h('p', { class: 'text-muted-foreground' },
              'Cards inside containers maintain proper spacing and alignment.'
            ),
          ]),
        ]),
      ]);
    },
  }),
};

export const WithGrid: Story = {
  render: () => ({
    components: { Container, Card },
    render() {
      return h(Container, { class: 'py-8' }, () => [
        h('h2', { class: 'text-xl font-bold mb-6' }, 'Grid Layout in Container'),
        h('div', { class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' }, [
          ...Array.from({ length: 6 }).map((_, i) =>
            h(Card, { key: i, class: 'p-4' }, () => [
              h('h3', { class: 'font-semibold' }, `Card ${i + 1}`),
              h('p', { class: 'text-sm text-muted-foreground mt-1' }, 'Card content here'),
            ])
          ),
        ]),
      ]);
    },
  }),
};

export const PageLayout: Story = {
  render: () => ({
    components: { Container, Card, Link },
    render() {
      return h('div', { class: 'min-h-[400px] bg-background' }, [
        // Header
        h('div', { class: 'border-b' }, [
          h(Container, { class: 'py-4' }, () => [
            h('div', { class: 'flex items-center justify-between' }, [
              h('h1', { class: 'text-xl font-bold' }, 'My App'),
              h('nav', { class: 'flex gap-4' }, [
                h(Link, { to: '#' }, () => 'Home'),
                h(Link, { to: '#' }, () => 'About'),
                h(Link, { to: '#' }, () => 'Contact'),
              ]),
            ]),
          ]),
        ]),
        // Main content
        h(Container, { as: 'main', class: 'py-8' }, () => [
          h('h2', { class: 'text-2xl font-bold mb-4' }, 'Welcome'),
          h('p', { class: 'text-muted-foreground mb-6' },
            'This demonstrates a typical page layout using Container components.'
          ),
          h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
            h(Card, { class: 'p-4' }, () => [
              h('h3', { class: 'font-semibold mb-2' }, 'Feature 1'),
              h('p', { class: 'text-sm text-muted-foreground' }, 'Description of feature 1'),
            ]),
            h(Card, { class: 'p-4' }, () => [
              h('h3', { class: 'font-semibold mb-2' }, 'Feature 2'),
              h('p', { class: 'text-sm text-muted-foreground' }, 'Description of feature 2'),
            ]),
          ]),
        ]),
        // Footer
        h('div', { class: 'border-t mt-auto' }, [
          h(Container, { class: 'py-4' }, () => [
            h('p', { class: 'text-sm text-muted-foreground text-center' }, '© 2024 My App'),
          ]),
        ]),
      ]);
    },
  }),
};
