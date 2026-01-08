import type { Meta, StoryObj } from '@storybook/vue3';
import PlaceholderPattern from './PlaceholderPattern.vue';

const meta: Meta<typeof PlaceholderPattern> = {
  title: 'Components/PlaceholderPattern',
  component: PlaceholderPattern,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An SVG pattern component for placeholder backgrounds. Displays a diagonal stripe pattern that adapts to light/dark mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { PlaceholderPattern },
    template: `
      <div class="relative w-64 h-48 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
        <PlaceholderPattern />
      </div>
    `,
  }),
};
