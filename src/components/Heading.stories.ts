import type { Meta, StoryObj } from '@storybook/vue3';
import Heading from './Heading.vue';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading text',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the heading',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Page Title',
    description: 'This is a helpful description that provides more context about this section.',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long page title that might overflow or wrap to multiple lines depending on the container width',
    description: 'Even with a long title, the description should still be readable.',
  },
};
