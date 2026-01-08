import type { Meta, StoryObj } from '@storybook/vue3';
import Card from '@nuxt/ui/components/Card.vue';
import Badge from '@nuxt/ui/components/Badge.vue';
import Button from '@nuxt/ui/components/Button.vue';

const meta: Meta<typeof Card> = {
  title: 'Nuxt UI/Elements/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card class="w-96">
        <template #header>
          <h3 class="text-lg font-semibold">Card Title</h3>
          <p class="text-sm text-muted-foreground">Card description goes here</p>
        </template>
        <p>This is the main content of the card. You can put any content here including text, images, and other components.</p>
      </Card>
    `,
  }),
};

export const WithHeader: Story = {
  render: () => ({
    components: { Card, Badge },
    template: `
      <Card class="w-96">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Settings</h3>
            <Badge color="primary">New</Badge>
          </div>
        </template>
        <p>Configure your application settings here.</p>
      </Card>
    `,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card class="w-96">
        <template #header>
          <h3 class="text-lg font-semibold">Confirm Action</h3>
        </template>
        <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button color="primary">Confirm</Button>
          </div>
        </template>
      </Card>
    `,
  }),
};

export const WithImage: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card class="w-96 overflow-hidden">
        <img src="https://picsum.photos/400/200" alt="Card image" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">Beautiful Landscape</h3>
          <p class="text-sm text-muted-foreground">A stunning view of nature captured in this photograph.</p>
        </div>
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">2 hours ago</span>
            <Button variant="ghost" size="sm" icon="i-lucide-heart" aria-label="Like" />
          </div>
        </template>
      </Card>
    `,
  }),
};
