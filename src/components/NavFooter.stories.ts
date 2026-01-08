import type { Meta, StoryObj } from '@storybook/vue3';
import { BookOpen, LifeBuoy } from 'lucide-vue-next';
import NavFooter from './NavFooter.vue';
import type { NavItem } from '@/types';

const itemsWithIcons: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Support', href: 'https://support.example.com', icon: LifeBuoy },
];

const meta: Meta<typeof NavFooter> = {
  title: 'App/NavFooter',
  component: NavFooter,
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      description: 'Whether the navigation is in collapsed state',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavFooter },
    setup() {
      return { items: itemsWithIcons, args };
    },
    template: '<NavFooter :items="items" :collapsed="args.collapsed" />',
  }),
  args: {
    collapsed: false,
  },
};

export const Collapsed: Story = {
  render: (args) => ({
    components: { NavFooter },
    setup() {
      return { items: itemsWithIcons, args };
    },
    template: '<NavFooter :items="items" :collapsed="args.collapsed" />',
  }),
  args: {
    collapsed: true,
  },
};

export const Empty: Story = {
  render: () => ({
    components: { NavFooter },
    template: '<NavFooter :items="[]" :collapsed="false" />',
  }),
};
