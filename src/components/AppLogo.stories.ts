import type { Meta, StoryObj } from '@storybook/vue3';
import AppLogo from './AppLogo.vue';

const meta: Meta<typeof AppLogo> = {
  title: 'App/AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
