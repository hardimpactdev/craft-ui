import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import ContextMenu from '@nuxt/ui/components/ContextMenu.vue';

const ContextMenuStory = defineComponent({
  name: 'ContextMenuStory',
  components: { ContextMenu },
  setup() {
    const open = ref(false);

    const items = [
      [{ label: 'Profile', icon: 'i-lucide-user' }],
      [
        { label: 'Settings', icon: 'i-lucide-settings' },
        { label: 'Logout', icon: 'i-lucide-log-out' },
      ],
    ];

    return () => h('div', [
      h(ContextMenu, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        items,
      }, {
        default: () => h('div', {
          class: 'flex items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/50',
        }, [
          h('p', { class: 'text-muted-foreground' }, 'Right-click here to open context menu'),
        ]),
      }),
    ]);
  },
});

const meta: Meta<typeof ContextMenu> = {
  title: 'Nuxt UI/Overlays/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => ({
    components: { ContextMenu, ContextMenuStory },
    template: '<ContextMenuStory />',
  }),
};
