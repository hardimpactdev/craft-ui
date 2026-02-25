import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { Home, FolderOpen, Settings, HelpCircle, BookOpen } from 'lucide-vue-next';
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { NavItem, BreadcrumbItem } from '@/types';
import { mockUser, mockUserWithAvatar } from '../../.storybook/inertia-mock';

const mainItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home, isActive: true },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const footerItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Help', href: 'https://help.example.com', icon: HelpCircle },
];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

const MockLogo = defineComponent({
  name: 'MockLogo',
  template: `
    <div class="flex items-center gap-2">
      <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <svg class="size-5 fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l12 6v10l-12-6V18zm28 0v10l-12 6V24l12-6z"/>
        </svg>
      </div>
      <span class="truncate text-sm font-semibold">Acme Inc</span>
    </div>
  `,
});

const meta: Meta<typeof AppSidebarLayout> = {
  title: 'App/AppSidebar',
  component: AppSidebarLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Collapsible sidebar navigation using sidebar primitives. Collapses to icons with tooltips. Includes SidebarRail for hover-to-expand.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainNavItems: mainItems,
    footerNavItems: footerItems,
    user: mockUser,
    breadcrumbs,
    homeUrl: '/dashboard',
  },
  render: (args) => ({
    components: { AppSidebarLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppSidebarLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <main class="flex-1 p-6">
          <h1 class="text-xl font-semibold mb-4">Main Content</h1>
          <p class="text-muted-foreground">This is the main content area next to the sidebar.</p>
        </main>
      </AppSidebarLayout>
    `,
  }),
};

export const WithAvatar: Story = {
  args: {
    mainNavItems: mainItems,
    footerNavItems: footerItems,
    user: mockUserWithAvatar,
    breadcrumbs,
    homeUrl: '/dashboard',
  },
  render: (args) => ({
    components: { AppSidebarLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppSidebarLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <main class="flex-1 p-6">
          <h1 class="text-xl font-semibold mb-4">Main Content</h1>
          <p class="text-muted-foreground">Sidebar with user avatar.</p>
        </main>
      </AppSidebarLayout>
    `,
  }),
};
