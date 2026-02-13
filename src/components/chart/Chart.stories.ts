import type { Meta, StoryObj } from '@storybook/vue3';
import { ChartContainer } from './index';

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { ChartContainer },
    template: `
      <div class="p-4">
        <p class="text-sm text-muted-foreground">Chart stories require complex data setup. Please refer to Shadcn Vue documentation for examples.</p>
      </div>
    `,
  }),
};
