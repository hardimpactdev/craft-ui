import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import Slideover from '@nuxt/ui/components/Slideover.vue';
import Button from '@nuxt/ui/components/Button.vue';

const SlideoverStory = defineComponent({
  name: 'SlideoverStory',
  components: { Slideover, Button },
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    side: { type: String as () => 'left' | 'right', default: 'right' },
  },
  setup(props) {
    const open = ref(false);

    return () => h('div', [
      h(Button, {
        label: 'Open Slideover',
        onClick: () => { open.value = true; },
      }),
      h(Slideover, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        title: props.title || undefined,
        description: props.description || undefined,
        side: props.side,
      }, {
        default: () => h('div', { class: 'p-4' }, [
          h('p', 'This is the slideover content.'),
          h('p', { class: 'mt-4 text-muted-foreground' }, 'You can add any content here.'),
        ]),
      }),
    ]);
  },
});

const meta: Meta<typeof Slideover> = {
  title: 'Nuxt UI/Overlays/Slideover',
  component: Slideover,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    side: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slideover>;

export const Default: Story = {
  render: () => ({
    components: { Slideover, Button, SlideoverStory },
    template: '<SlideoverStory side="right" />',
  }),
};

export const FromLeft: Story = {
  render: () => ({
    components: { Slideover, Button, SlideoverStory },
    template: '<SlideoverStory title="Navigation" side="left" />',
  }),
};

export const FromRight: Story = {
  render: () => ({
    components: { Slideover, Button, SlideoverStory },
    template: '<SlideoverStory title="Details Panel" side="right" />',
  }),
};

export const WithTitle: Story = {
  render: () => ({
    components: { Slideover, Button, SlideoverStory },
    template: '<SlideoverStory title="Slideover Title" description="This slideover has a title and description." side="right" />',
  }),
};
