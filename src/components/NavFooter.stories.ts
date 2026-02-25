import type { Meta, StoryObj } from '@storybook/vue3';
import { BookOpen, LifeBuoy } from 'lucide-vue-next';
import NavFooter from './NavFooter.vue';
import { Sidebar, SidebarFooter, SidebarProvider } from '@/components/sidebar';
import type { NavItem } from '@/types';

const itemsWithIcons: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Support', href: 'https://support.example.com', icon: LifeBuoy },
];

const meta: Meta<typeof NavFooter> = {
  title: 'App/NavFooter',
  component: NavFooter,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { SidebarProvider, Sidebar, SidebarFooter, story },
      template: `
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarFooter>
              <story />
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      `,
    }),
  ],
  parameters: {
    layout: 'fullscreen',
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
    template: '<NavFooter :items="items" />',
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { NavFooter },
    template: '<NavFooter :items="[]" />',
  }),
};
