import type { Meta, StoryObj } from '@storybook/vue3';
import AppearanceTabs from './AppearanceTabs.vue';

const meta: Meta<typeof AppearanceTabs> = {
  title: 'Components/AppearanceTabs',
  component: AppearanceTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
