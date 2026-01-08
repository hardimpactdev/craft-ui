import type { Meta, StoryObj } from '@storybook/vue3';
import Avatar from '@nuxt/ui/components/Avatar.vue';

const meta: Meta<typeof Avatar> = {
  title: 'Nuxt UI/Elements/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => ({
    components: { Avatar },
    template: `<Avatar alt="Default user" />`,
  }),
};

export const WithImage: Story = {
  render: () => ({
    components: { Avatar },
    template: `<Avatar src="https://i.pravatar.cc/128" alt="User avatar" />`,
  }),
};

export const WithInitials: Story = {
  render: () => ({
    components: { Avatar },
    template: `<Avatar text="JD" alt="John Doe" />`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar text="XS" size="xs" alt="Extra small avatar" />
        <Avatar text="SM" size="sm" alt="Small avatar" />
        <Avatar text="MD" size="md" alt="Medium avatar" />
        <Avatar text="LG" size="lg" alt="Large avatar" />
        <Avatar text="XL" size="xl" alt="Extra large avatar" />
      </div>
    `,
  }),
};

export const WithChip: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar src="https://i.pravatar.cc/128" alt="Online user" :chip="{ color: 'primary', position: 'bottom-right' }" />
        <Avatar text="JD" alt="Away user" :chip="{ color: 'secondary', position: 'top-right' }" />
        <Avatar src="https://i.pravatar.cc/128" alt="Busy user" :chip="{ color: 'neutral', position: 'bottom-left' }" />
      </div>
    `,
  }),
};
