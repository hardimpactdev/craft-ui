import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from '@nuxt/ui/components/Skeleton.vue';

const meta: Meta<typeof Skeleton> = {
  title: 'Nuxt UI/Elements/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template: `<Skeleton class="h-4 w-[250px]" />`,
  }),
};

export const Circle: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="flex items-center gap-4">
        <Skeleton class="h-8 w-8 rounded-full" />
        <Skeleton class="h-12 w-12 rounded-full" />
        <Skeleton class="h-16 w-16 rounded-full" />
      </div>
    `,
  }),
};

export const TextLines: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-2">
        <Skeleton class="h-4 w-[300px]" />
        <Skeleton class="h-4 w-[280px]" />
        <Skeleton class="h-4 w-[260px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    `,
  }),
};

export const CardPlaceholder: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="flex flex-col space-y-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    `,
  }),
};

export const UserCard: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="flex items-center space-x-4">
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[150px]" />
          <Skeleton class="h-4 w-[100px]" />
        </div>
      </div>
    `,
  }),
};

export const TableRows: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-3 w-full max-w-md">
        <div class="flex items-center gap-4">
          <Skeleton class="h-4 w-[100px]" />
          <Skeleton class="h-4 w-[150px]" />
          <Skeleton class="h-4 w-[80px]" />
        </div>
        <div v-for="i in 5" :key="i" class="flex items-center gap-4">
          <Skeleton class="h-4 w-[100px]" />
          <Skeleton class="h-4 w-[150px]" />
          <Skeleton class="h-4 w-[80px]" />
        </div>
      </div>
    `,
  }),
};
