import type { Meta, StoryObj } from '@storybook/vue3';
import { Home, FolderOpen, Settings, Users, BarChart3, Mail, Calendar, FileText, Bell } from 'lucide-vue-next';
import NavMain from './NavMain.vue';
import type { NavItem } from '@/types';

const defaultItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const manyItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Team', href: '/team', icon: Users },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Messages', href: '/messages', icon: Mail },
  { title: 'Calendar', href: '/calendar', icon: Calendar },
  { title: 'Documents', href: '/documents', icon: FileText },
  { title: 'Notifications', href: '/notifications', icon: Bell },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const meta: Meta<typeof NavMain> = {
  title: 'App/NavMain',
  component: NavMain,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of navigation items with title, href, and optional icon',
    },
    collapsed: {
      description: 'Whether the navigation is in collapsed state (shows only icons)',
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Main navigation component for the sidebar. Uses Inertia\'s usePage() to determine active state based on current URL. In Storybook, active state detection will not work but styling is visible.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavMain },
    setup() {
      return { items: defaultItems, args };
    },
    template: '<NavMain :items="items" :collapsed="args.collapsed" />',
  }),
  args: {
    collapsed: false,
  },
};

export const Collapsed: Story = {
  render: (args) => ({
    components: { NavMain },
    setup() {
      return { items: defaultItems, args };
    },
    template: '<NavMain :items="items" :collapsed="args.collapsed" />',
  }),
  args: {
    collapsed: true,
  },
};

export const ManyItems: Story = {
  render: (args) => ({
    components: { NavMain },
    setup() {
      return { items: manyItems, args };
    },
    template: '<NavMain :items="items" :collapsed="args.collapsed" />',
  }),
  args: {
    collapsed: false,
  },
};

export const Empty: Story = {
  render: () => ({
    components: { NavMain },
    template: '<NavMain :items="[]" :collapsed="false" />',
  }),
};
