import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from '@nuxt/ui/components/Badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Nuxt UI/Elements/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => ({
    components: { Badge },
    template: `<Badge>Badge</Badge>`,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-2">
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-2">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="soft">Soft</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-2">
        <Badge size="xs">Extra Small</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    `,
  }),
};
