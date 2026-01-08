import type { Meta, StoryObj } from '@storybook/vue3';
import HeadingSmall from './HeadingSmall.vue';

const meta: Meta<typeof HeadingSmall> = {
  title: 'Components/HeadingSmall',
  component: HeadingSmall,
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
    title: 'Section Title',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a helpful description that provides more context about this section.',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long section title that might overflow or wrap to multiple lines depending on the container width',
    description: 'Even with a long title, the description should still be readable.',
  },
};
