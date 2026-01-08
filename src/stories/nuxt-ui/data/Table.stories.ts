import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Table from '@nuxt/ui/components/Table.vue';
import Button from '@nuxt/ui/components/Button.vue';

const columns = [
  { id: 'name', key: 'name', label: 'Name' },
  { id: 'email', key: 'email', label: 'Email' },
  { id: 'role', key: 'role', label: 'Role' },
];

const rows = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
  { name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin' },
];

const meta: Meta<typeof Table> = {
  title: 'Nuxt UI/Data/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    rows: {
      control: 'object',
      description: 'Array of row data',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns,
            rows,
          }),
        ]);
    },
  }),
};

export const WithSelection: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const selected = ref([]);
      return () =>
        h('div', { class: 'w-full space-y-4' }, [
          h(Table, {
            columns,
            rows,
            modelValue: selected.value,
            'onUpdate:modelValue': (val: any) => {
              selected.value = val;
            },
          }),
          h('p', { class: 'text-sm text-muted-foreground' }, [
            `Selected: ${selected.value.length} row(s)`,
          ]),
        ]);
    },
  }),
};

export const WithSorting: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const sortableColumns = columns.map((col) => ({
        ...col,
        sortable: true,
      }));
      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns: sortableColumns,
            rows,
          }),
        ]);
    },
  }),
};

export const WithPagination: Story = {
  render: () => ({
    components: { Table, Button },
    setup() {
      const page = ref(1);
      const pageSize = 2;
      const paginatedRows = () => {
        const start = (page.value - 1) * pageSize;
        return rows.slice(start, start + pageSize);
      };
      const totalPages = Math.ceil(rows.length / pageSize);

      return () =>
        h('div', { class: 'w-full space-y-4' }, [
          h(Table, {
            columns,
            rows: paginatedRows(),
          }),
          h('div', { class: 'flex items-center justify-between' }, [
            h('p', { class: 'text-sm text-muted-foreground' }, [
              `Page ${page.value} of ${totalPages}`,
            ]),
            h('div', { class: 'flex gap-2' }, [
              h(
                Button,
                {
                  variant: 'outline',
                  size: 'sm',
                  disabled: page.value === 1,
                  onClick: () => {
                    if (page.value > 1) page.value--;
                  },
                },
                () => 'Previous',
              ),
              h(
                Button,
                {
                  variant: 'outline',
                  size: 'sm',
                  disabled: page.value === totalPages,
                  onClick: () => {
                    if (page.value < totalPages) page.value++;
                  },
                },
                () => 'Next',
              ),
            ]),
          ]),
        ]);
    },
  }),
};

export const Loading: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns,
            rows: [],
            loading: true,
          }),
        ]);
    },
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns,
            rows: [],
          }),
        ]);
    },
  }),
};
