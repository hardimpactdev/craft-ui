import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import Popover from '@nuxt/ui/components/Popover.vue';
import Button from '@nuxt/ui/components/Button.vue';

const PopoverStory = defineComponent({
  name: 'PopoverStory',
  components: { Popover, Button },
  props: {
    side: { type: String as () => 'top' | 'bottom' | 'left' | 'right', default: 'bottom' },
  },
  setup(props) {
    const open = ref(false);

    return () => h('div', { class: 'flex items-center justify-center min-h-[200px]' }, [
      h(Popover, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        content: {
          side: props.side,
        },
      }, {
        default: () => h(Button, {
          label: 'Open Popover',
        }),
        content: () => h('div', { class: 'p-4' }, [
          h('p', { class: 'font-medium' }, 'Popover Content'),
          h('p', { class: 'text-sm text-muted-foreground mt-1' }, 'This is the popover content.'),
        ]),
      }),
    ]);
  },
});

const meta: Meta<typeof Popover> = {
  title: 'Nuxt UI/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => ({
    components: { Popover, Button, PopoverStory },
    template: '<PopoverStory side="bottom" />',
  }),
};

export const Top: Story = {
  render: () => ({
    components: { Popover, Button, PopoverStory },
    template: '<PopoverStory side="top" />',
  }),
};

export const Bottom: Story = {
  render: () => ({
    components: { Popover, Button, PopoverStory },
    template: '<PopoverStory side="bottom" />',
  }),
};

export const Left: Story = {
  render: () => ({
    components: { Popover, Button, PopoverStory },
    template: '<PopoverStory side="left" />',
  }),
};

export const Right: Story = {
  render: () => ({
    components: { Popover, Button, PopoverStory },
    template: '<PopoverStory side="right" />',
  }),
};
