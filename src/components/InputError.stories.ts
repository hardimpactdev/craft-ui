import type { Meta, StoryObj } from '@storybook/vue3';
import InputError from './InputError.vue';

const meta: Meta<typeof InputError> = {
  title: 'Components/InputError',
  component: InputError,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This field is required',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  },
};

export const Empty: Story = {
  args: {
    message: undefined,
  },
};
