import type { Meta, StoryObj } from '@storybook/vue3';
import Breadcrumbs from './Breadcrumbs.vue';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

const meta: Meta<typeof Breadcrumbs> = {
  title: 'App/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    breadcrumbs: {
      description:
        'Array of breadcrumb items with title and optional href. The last item should not have an href as it represents the current page.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { title: 'Home', href: '/' },
      { title: 'Current Page' },
    ] as BreadcrumbItem[],
  },
};

export const ThreeLevel: Story = {
  args: {
    breadcrumbs: [
      { title: 'Home', href: '/' },
      { title: 'Section', href: '/section' },
      { title: 'Current' },
    ] as BreadcrumbItem[],
  },
};

export const LongPath: Story = {
  args: {
    breadcrumbs: [
      { title: 'Home', href: '/' },
      { title: 'Products', href: '/products' },
      { title: 'Electronics', href: '/products/electronics' },
      { title: 'Smartphones', href: '/products/electronics/smartphones' },
      { title: 'iPhone 15 Pro' },
    ] as BreadcrumbItem[],
  },
};

export const SingleItem: Story = {
  args: {
    breadcrumbs: [{ title: 'Dashboard' }] as BreadcrumbItem[],
  },
};
