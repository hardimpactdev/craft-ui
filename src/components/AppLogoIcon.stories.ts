import type { Meta, StoryObj } from '@storybook/vue3';
import AppLogoIcon from './AppLogoIcon.vue';

const meta: Meta<typeof AppLogoIcon> = {
  title: 'App/AppLogoIcon',
  component: AppLogoIcon,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class for sizing and styling the icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    className: 'size-4',
  },
};

export const Large: Story = {
  args: {
    className: 'size-12',
  },
};

export const CustomColor: Story = {
  args: {
    className: 'size-8 text-blue-500',
  },
};
