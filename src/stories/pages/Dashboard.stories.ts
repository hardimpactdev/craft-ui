import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { Home, FolderOpen, Settings, BookOpen, HelpCircle } from 'lucide-vue-next';
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import { Card, CardContent } from '@/components/card';
import type { NavItem, BreadcrumbItem } from '@/types';
import { mockUser } from '../../../.storybook/inertia-mock';

// Mock logo matching AppLogo pattern
const MockLogo = {
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
};

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home, isActive: true },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '/settings/profile', icon: Settings },
];

const footerNavItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Help', href: 'https://help.example.com', icon: HelpCircle },
];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

const DashboardContent = defineComponent({
  name: 'DashboardContent',
  components: { PlaceholderPattern, Card, CardContent },
  template: `
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
      </div>
      <Card class="flex-1 py-0">
        <CardContent class="p-0 relative min-h-[50vh] h-full overflow-hidden rounded-xl bg-muted/50 md:min-h-min">
            <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </CardContent>
      </Card>
    </div>
  `,
});

const meta: Meta<typeof AppSidebarLayout> = {
  title: 'Pages/Dashboard',
  component: AppSidebarLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Dashboard page demo using the exported AppSidebarLayout component.

Features:
- Collapsible sidebar with inset variant
- Breadcrumb navigation
- Placeholder content grid (3 cards + large section)
- Responsive design
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainNavItems,
    footerNavItems,
    user: mockUser,
    breadcrumbs,
    homeUrl: '/dashboard',
  },
  render: (args) => ({
    components: { AppSidebarLayout, MockLogo, DashboardContent },
    setup() {
      return { args };
    },
    template: `
      <AppSidebarLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <DashboardContent />
      </AppSidebarLayout>
    `,
  }),
};
