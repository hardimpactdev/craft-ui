import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import { useOverlay } from '@nuxt/ui/composables';
import Button from '@nuxt/ui/components/Button.vue';
import Modal from '@nuxt/ui/components/Modal.vue';
import Slideover from '@nuxt/ui/components/Slideover.vue';

// Confirmation Modal Component
const ConfirmModal = defineComponent({
  name: 'ConfirmModal',
  components: { Modal, Button },
  props: {
    title: { type: String, default: 'Confirm Action' },
    message: { type: String, default: 'Are you sure you want to proceed?' },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const open = ref(true);

    const confirm = () => {
      emit('close', true);
      open.value = false;
    };

    const cancel = () => {
      emit('close', false);
      open.value = false;
    };

    return () => h(Modal, {
      open: open.value,
      'onUpdate:open': (v: boolean) => { open.value = v; if (!v) emit('close', false); },
      title: props.title,
      description: props.message,
    }, {
      default: () => h('div', { class: 'flex justify-end gap-2 p-4' }, [
        h(Button, { variant: 'outline', onClick: cancel }, () => 'Cancel'),
        h(Button, { onClick: confirm }, () => 'Confirm'),
      ]),
    });
  },
});

// Form Slideover Component
const FormSlideover = defineComponent({
  name: 'FormSlideover',
  components: { Slideover, Button },
  emits: ['close'],
  setup(_, { emit }) {
    const open = ref(true);
    const name = ref('');

    const submit = () => {
      emit('close', { name: name.value });
      open.value = false;
    };

    const cancel = () => {
      emit('close', null);
      open.value = false;
    };

    return () => h(Slideover, {
      open: open.value,
      'onUpdate:open': (v: boolean) => { open.value = v; if (!v) emit('close', null); },
      title: 'Create New Item',
      description: 'Fill in the details below.',
    }, {
      default: () => h('div', { class: 'p-4 space-y-4' }, [
        h('div', [
          h('label', { class: 'block text-sm font-medium mb-1' }, 'Name'),
          h('input', {
            value: name.value,
            onInput: (e: Event) => { name.value = (e.target as HTMLInputElement).value; },
            class: 'w-full px-3 py-2 border rounded-lg',
            placeholder: 'Enter name...',
          }),
        ]),
        h('div', { class: 'flex justify-end gap-2 pt-4' }, [
          h(Button, { variant: 'outline', onClick: cancel }, () => 'Cancel'),
          h(Button, { onClick: submit }, () => 'Create'),
        ]),
      ]),
    });
  },
});

const OverlayDemo = defineComponent({
  name: 'OverlayDemo',
  components: { Button },
  setup() {
    const overlay = useOverlay();
    const result = ref<string>('');

    const showConfirmModal = async () => {
      const modal = overlay.create(ConfirmModal, {
        props: {
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This action cannot be undone.',
        },
      });

      const confirmed = await modal.open();
      result.value = confirmed ? 'Confirmed!' : 'Cancelled';
    };

    const showFormSlideover = async () => {
      const slideover = overlay.create(FormSlideover);
      const data = await slideover.open();
      result.value = data ? `Created: ${data.name}` : 'Cancelled';
    };

    return () => h('div', { class: 'space-y-4' }, [
      h('div', { class: 'flex gap-2' }, [
        h(Button, { onClick: showConfirmModal }, () => 'Open Confirm Modal'),
        h(Button, { onClick: showFormSlideover, variant: 'outline' }, () => 'Open Form Slideover'),
      ]),
      result.value && h('div', { class: 'mt-4 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg' }, [
        h('span', { class: 'text-sm' }, `Result: ${result.value}`),
      ]),
    ]);
  },
});

const meta: Meta = {
  title: 'Nuxt UI/Composables/useOverlay',
  component: OverlayDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`useOverlay\` composable provides programmatic control over Modal and Slideover components.

## Usage

\`\`\`ts
import { useOverlay } from '@hardimpactdev/liftoff-vue';

const overlay = useOverlay();

// Create and open a modal
const modal = overlay.create(MyModalComponent, {
  props: { title: 'My Modal' },
});

// Open and await result
const result = await modal.open();

// The component should emit 'close' with a value
// when it wants to close and return data
\`\`\`

## Component Requirements

Your modal/slideover component should:
1. Emit a \`close\` event with the result value
2. Handle its own open state (or use the overlay's state)

## Methods

- \`create(component, options)\` - Create an overlay instance
- \`open(props?)\` - Open the overlay, returns a promise
- \`close(value?)\` - Close and resolve with value
- \`patch(props)\` - Update props without closing
- \`isOpen()\` - Check if open
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    components: { OverlayDemo },
    template: '<OverlayDemo />',
  }),
};
