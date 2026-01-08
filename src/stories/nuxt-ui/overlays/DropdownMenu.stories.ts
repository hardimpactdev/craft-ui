import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import DropdownMenu from '@nuxt/ui/components/DropdownMenu.vue';
import Button from '@nuxt/ui/components/Button.vue';

const DropdownMenuStory = defineComponent({
  name: 'DropdownMenuStory',
  components: { DropdownMenu, Button },
  props: {
    variant: { type: String, default: 'default' },
  },
  setup(props) {
    const open = ref(false);

    const defaultItems = [
      [{ label: 'Profile' }],
      [{ label: 'Settings' }, { label: 'Logout' }],
    ];

    const groupedItems = [
      [
        { label: 'New File', type: 'label' as const },
        { label: 'Document' },
        { label: 'Spreadsheet' },
        { label: 'Presentation' },
      ],
      [
        { label: 'Import', type: 'label' as const },
        { label: 'From Computer' },
        { label: 'From Cloud' },
      ],
    ];

    const itemsWithIcons = [
      [{ label: 'Profile', icon: 'i-lucide-user' }],
      [
        { label: 'Settings', icon: 'i-lucide-settings' },
        { label: 'Logout', icon: 'i-lucide-log-out' },
      ],
    ];

    const itemsWithShortcuts = [
      [
        { label: 'New File', icon: 'i-lucide-file-plus', kbds: ['meta', 'N'] },
        { label: 'Open', icon: 'i-lucide-folder-open', kbds: ['meta', 'O'] },
        { label: 'Save', icon: 'i-lucide-save', kbds: ['meta', 'S'] },
      ],
      [
        { label: 'Undo', icon: 'i-lucide-undo', kbds: ['meta', 'Z'] },
        { label: 'Redo', icon: 'i-lucide-redo', kbds: ['meta', 'shift', 'Z'] },
      ],
    ];

    const getItems = () => {
      switch (props.variant) {
        case 'groups':
          return groupedItems;
        case 'icons':
          return itemsWithIcons;
        case 'shortcuts':
          return itemsWithShortcuts;
        default:
          return defaultItems;
      }
    };

    return () => h('div', [
      h(DropdownMenu, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        items: getItems(),
      }, {
        default: () => h(Button, {
          label: 'Open Menu',
          trailingIcon: 'i-lucide-chevron-down',
        }),
      }),
    ]);
  },
});

const meta: Meta<typeof DropdownMenu> = {
  title: 'Nuxt UI/Overlays/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'groups', 'icons', 'shortcuts'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => ({
    components: { DropdownMenu, Button, DropdownMenuStory },
    template: '<DropdownMenuStory variant="default" />',
  }),
};

export const WithGroups: Story = {
  render: () => ({
    components: { DropdownMenu, Button, DropdownMenuStory },
    template: '<DropdownMenuStory variant="groups" />',
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { DropdownMenu, Button, DropdownMenuStory },
    template: '<DropdownMenuStory variant="icons" />',
  }),
};

export const WithShortcuts: Story = {
  render: () => ({
    components: { DropdownMenu, Button, DropdownMenuStory },
    template: '<DropdownMenuStory variant="shortcuts" />',
  }),
};
