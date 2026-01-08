import type { Meta, StoryObj } from '@storybook/vue3';
import ThemeDemo from './ThemeDemo.vue';

const THEMES = ['zinc', 'slate', 'blue', 'green', 'violet', 'rose', 'orange'] as const;
const MODES = ['light', 'dark'] as const;

const meta: Meta<typeof ThemeDemo> = {
  title: 'Themes/Theme Demo',
  component: ThemeDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: THEMES,
      description: 'Select a theme preset to preview',
      table: {
        defaultValue: { summary: 'zinc' },
      },
    },
    mode: {
      control: 'radio',
      options: MODES,
      description: 'Toggle between light and dark mode',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'zinc',
    mode: 'light',
  },
};
