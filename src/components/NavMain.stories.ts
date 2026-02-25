import type { Meta, StoryObj } from '@storybook/vue3';
import { Home, FolderOpen, Settings, Users, BarChart3, Mail, Calendar, FileText, Bell } from 'lucide-vue-next';
import NavMain from './NavMain.vue';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/sidebar';
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
    label: {
      description: 'Group label displayed above the navigation items',
      control: 'text',
    },
  },
  decorators: [
    (story) => ({
      components: { SidebarProvider, Sidebar, SidebarContent, story },
      template: `
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarContent>
              <story />
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      `,
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main navigation component for the sidebar. Uses sidebar primitives for proper collapse-to-icon behavior with tooltips.',
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
    template: '<NavMain :items="items" :label="args.label" />',
  }),
  args: {
    label: 'Platform',
  },
};

export const ManyItems: Story = {
  render: (args) => ({
    components: { NavMain },
    setup() {
      return { items: manyItems, args };
    },
    template: '<NavMain :items="items" :label="args.label" />',
  }),
  args: {
    label: 'Platform',
  },
};

export const Empty: Story = {
  render: () => ({
    components: { NavMain },
    template: '<NavMain :items="[]" />',
  }),
};
