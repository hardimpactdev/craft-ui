import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import Tooltip from '@nuxt/ui/components/Tooltip.vue';
import Button from '@nuxt/ui/components/Button.vue';

const TooltipStory = defineComponent({
  name: 'TooltipStory',
  components: { Tooltip, Button },
  props: {
    text: { type: String, default: 'This is a tooltip' },
    side: { type: String as () => 'top' | 'bottom' | 'left' | 'right', default: 'top' },
    delayDuration: { type: Number, default: 0 },
  },
  setup(props) {
    const open = ref(false);

    return () => h('div', { class: 'flex items-center justify-center min-h-[150px]' }, [
      h(Tooltip, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        text: props.text,
        content: {
          side: props.side,
        },
        delayDuration: props.delayDuration,
      }, {
        default: () => h(Button, {
          label: 'Hover me',
        }),
      }),
    ]);
  },
});

const meta: Meta<typeof Tooltip> = {
  title: 'Nuxt UI/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delayDuration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="This is a tooltip" side="top" :delayDuration="0" />',
  }),
};

export const Top: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="Tooltip on top" side="top" />',
  }),
};

export const Bottom: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="Tooltip on bottom" side="bottom" />',
  }),
};

export const Left: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="Tooltip on left" side="left" />',
  }),
};

export const Right: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="Tooltip on right" side="right" />',
  }),
};

export const WithDelay: Story = {
  render: () => ({
    components: { Tooltip, Button, TooltipStory },
    template: '<TooltipStory text="This tooltip appears after a delay" side="top" :delayDuration="500" />',
  }),
};
