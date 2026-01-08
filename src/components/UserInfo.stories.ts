import type { Meta, StoryObj } from '@storybook/vue3';
import UserInfo from './UserInfo.vue';
import { mockUser, mockUserWithAvatar } from '../../.storybook/inertia-mock';

const meta: Meta<typeof UserInfo> = {
  title: 'App/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'User object with id, name, email, and optional avatar',
    },
    showEmail: {
      description: 'Whether to display the user email',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const WithAvatar: Story = {
  args: {
    user: mockUserWithAvatar,
  },
};

export const WithEmail: Story = {
  args: {
    user: mockUser,
    showEmail: true,
  },
};

export const WithAvatarAndEmail: Story = {
  args: {
    user: mockUserWithAvatar,
    showEmail: true,
  },
};
