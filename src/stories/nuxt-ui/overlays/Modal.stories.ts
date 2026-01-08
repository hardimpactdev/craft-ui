import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import Modal from '@nuxt/ui/components/Modal.vue';
import Button from '@nuxt/ui/components/Button.vue';

const ModalStory = defineComponent({
  name: 'ModalStory',
  components: { Modal, Button },
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    showFooter: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    preventClose: { type: Boolean, default: false },
  },
  setup(props) {
    const open = ref(false);

    return () => h('div', [
      h(Button, {
        label: 'Open Modal',
        onClick: () => { open.value = true; },
      }),
      h(Modal, {
        open: open.value,
        'onUpdate:open': (value: boolean) => { open.value = value; },
        title: props.title || undefined,
        description: props.description || undefined,
        fullscreen: props.fullscreen,
        preventClose: props.preventClose,
      }, {
        default: () => [
          h('div', { class: 'p-4' }, [
            !props.title && !props.description
              ? h('p', 'This is the modal content.')
              : h('p', 'Additional modal content goes here.'),
          ]),
          props.showFooter
            ? h('div', { class: 'flex justify-end gap-2 p-4 border-t' }, [
                h(Button, {
                  label: 'Cancel',
                  variant: 'outline',
                  onClick: () => { open.value = false; },
                }),
                h(Button, {
                  label: 'Confirm',
                  onClick: () => { open.value = false; },
                }),
              ])
            : null,
        ],
      }),
    ]);
  },
});

const meta: Meta<typeof Modal> = {
  title: 'Nuxt UI/Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showFooter: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    preventClose: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory />',
  }),
};

export const WithTitle: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory title="Modal Title" />',
  }),
};

export const WithDescription: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory title="Modal Title" description="This is a description that provides more context about the modal." />',
  }),
};

export const WithFooter: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory title="Confirm Action" description="Are you sure you want to proceed with this action?" :showFooter="true" />',
  }),
};

export const FullScreen: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory title="Full Screen Modal" description="This modal takes up the entire screen." :fullscreen="true" />',
  }),
};

export const PreventClose: Story = {
  render: () => ({
    components: { Modal, Button, ModalStory },
    template: '<ModalStory title="Important Notice" description="This modal cannot be closed by clicking outside or pressing Escape. Use the footer buttons." :showFooter="true" :preventClose="true" />',
  }),
};
