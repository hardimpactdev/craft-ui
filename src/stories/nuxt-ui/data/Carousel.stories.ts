import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Carousel from '@nuxt/ui/components/Carousel.vue';

const slides = [
  { id: 1, title: 'Slide 1', color: 'bg-blue-500' },
  { id: 2, title: 'Slide 2', color: 'bg-green-500' },
  { id: 3, title: 'Slide 3', color: 'bg-purple-500' },
  { id: 4, title: 'Slide 4', color: 'bg-orange-500' },
];

const meta: Meta<typeof Carousel> = {
  title: 'Nuxt UI/Data/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    arrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    dots: {
      control: 'boolean',
      description: 'Show navigation dots',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite looping',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => ({
    components: { Carousel },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-2xl' }, [
          h(
            Carousel,
            { items: slides },
            {
              default: ({ item }: { item: (typeof slides)[0] }) =>
                h(
                  'div',
                  {
                    class: `${item.color} h-48 flex items-center justify-center text-white text-2xl font-bold rounded-lg`,
                  },
                  item.title,
                ),
            },
          ),
        ]);
    },
  }),
};

export const WithArrows: Story = {
  render: () => ({
    components: { Carousel },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-2xl' }, [
          h(
            Carousel,
            { items: slides, arrows: true },
            {
              default: ({ item }: { item: (typeof slides)[0] }) =>
                h(
                  'div',
                  {
                    class: `${item.color} h-48 flex items-center justify-center text-white text-2xl font-bold rounded-lg`,
                  },
                  item.title,
                ),
            },
          ),
        ]);
    },
  }),
};

export const WithDots: Story = {
  render: () => ({
    components: { Carousel },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-2xl' }, [
          h(
            Carousel,
            { items: slides, dots: true },
            {
              default: ({ item }: { item: (typeof slides)[0] }) =>
                h(
                  'div',
                  {
                    class: `${item.color} h-48 flex items-center justify-center text-white text-2xl font-bold rounded-lg`,
                  },
                  item.title,
                ),
            },
          ),
        ]);
    },
  }),
};

export const WithArrowsAndDots: Story = {
  render: () => ({
    components: { Carousel },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-2xl' }, [
          h(
            Carousel,
            { items: slides, arrows: true, dots: true },
            {
              default: ({ item }: { item: (typeof slides)[0] }) =>
                h(
                  'div',
                  {
                    class: `${item.color} h-48 flex items-center justify-center text-white text-2xl font-bold rounded-lg`,
                  },
                  item.title,
                ),
            },
          ),
        ]);
    },
  }),
};

export const Loop: Story = {
  render: () => ({
    components: { Carousel },
    setup() {
      return () =>
        h('div', { class: 'w-full max-w-2xl' }, [
          h(
            Carousel,
            { items: slides, arrows: true, loop: true },
            {
              default: ({ item }: { item: (typeof slides)[0] }) =>
                h(
                  'div',
                  {
                    class: `${item.color} h-48 flex items-center justify-center text-white text-2xl font-bold rounded-lg`,
                  },
                  item.title,
                ),
            },
          ),
        ]);
    },
  }),
};
