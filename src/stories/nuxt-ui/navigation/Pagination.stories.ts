import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Pagination from '@nuxt/ui/components/Pagination.vue';

const meta: Meta<typeof Pagination> = {
  title: 'Nuxt UI/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    total: {
      control: 'number',
      description: 'Total number of items',
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
    },
    siblingCount: {
      control: 'number',
      description: 'Number of siblings around the current page',
    },
    showEdges: {
      control: 'boolean',
      description: 'Always show first and last page buttons',
    },
    showControls: {
      control: 'boolean',
      description: 'Show first, prev, next, last controls',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all controls',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the pagination buttons',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color of inactive controls',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { page };
    },
    render() {
      return h('div', { class: 'p-4' }, [
        h(Pagination, {
          'modelValue:page': this.page,
          'onUpdate:page': (val: number) => {
            this.page = val;
          },
          total: 100,
        }),
        h('p', { class: 'mt-4 text-sm text-muted' }, `Current page: ${this.page}`),
      ]);
    },
  }),
};

export const WithTotal: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { page };
    },
    render() {
      return h('div', { class: 'p-4 space-y-6' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Total: 50 items'),
          h(Pagination, {
            'modelValue:page': this.page,
            'onUpdate:page': (val: number) => {
              this.page = val;
            },
            total: 50,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Total: 200 items'),
          h(Pagination, {
            page: 1,
            total: 200,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Total: 500 items'),
          h(Pagination, {
            page: 1,
            total: 500,
          }),
        ]),
      ]);
    },
  }),
};

export const WithPageSize: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { page };
    },
    render() {
      return h('div', { class: 'p-4 space-y-6' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, '5 items per page (100 total = 20 pages)'),
          h(Pagination, {
            'modelValue:page': this.page,
            'onUpdate:page': (val: number) => {
              this.page = val;
            },
            total: 100,
            itemsPerPage: 5,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, '10 items per page (100 total = 10 pages)'),
          h(Pagination, {
            page: 1,
            total: 100,
            itemsPerPage: 10,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, '25 items per page (100 total = 4 pages)'),
          h(Pagination, {
            page: 1,
            total: 100,
            itemsPerPage: 25,
          }),
        ]),
      ]);
    },
  }),
};

export const WithSiblings: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(5);
      return { page };
    },
    render() {
      return h('div', { class: 'p-4 space-y-6' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Sibling count: 1'),
          h(Pagination, {
            'modelValue:page': this.page,
            'onUpdate:page': (val: number) => {
              this.page = val;
            },
            total: 100,
            siblingCount: 1,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Sibling count: 2 (default)'),
          h(Pagination, {
            page: 5,
            total: 100,
            siblingCount: 2,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Sibling count: 3'),
          h(Pagination, {
            page: 5,
            total: 100,
            siblingCount: 3,
          }),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'With showEdges enabled'),
          h(Pagination, {
            page: 5,
            total: 100,
            siblingCount: 1,
            showEdges: true,
          }),
        ]),
      ]);
    },
  }),
};
