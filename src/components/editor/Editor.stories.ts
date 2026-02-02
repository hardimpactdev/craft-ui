import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, computed } from 'vue';
import Editor from './Editor.vue';
import EditorToolbar from './EditorToolbar.vue';
import EditorBubbleMenu from './EditorBubbleMenu.vue';

const meta = {
  title: 'Components/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The HTML content of the editor',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled',
    },
  },
  args: {
    modelValue: '',
    placeholder: 'Start typing...',
    disabled: false,
  },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Editor },
    setup() {
      const content = ref(args.modelValue);
      return { args, content };
    },
    template: `
      <Editor
        v-bind="args"
        v-model="content"
      />
    `,
  }),
};

export const WithContent: Story = {
  args: {
    modelValue: `
      <h2>Welcome to the Editor</h2>
      <p>This is a <strong>rich text editor</strong> component built with Tiptap.</p>
      <p>You can use it to create formatted content with:</p>
      <ul>
        <li><em>Italic text</em></li>
        <li><strong>Bold text</strong></li>
        <li><s>Strikethrough</s></li>
      </ul>
      <blockquote>And even blockquotes!</blockquote>
    `,
  },
  render: (args) => ({
    components: { Editor },
    setup() {
      const content = ref(args.modelValue);
      return { args, content };
    },
    template: `
      <Editor
        v-bind="args"
        v-model="content"
      />
    `,
  }),
};

export const WithToolbar: Story = {
  render: (args) => ({
    components: { Editor, EditorToolbar },
    setup() {
      const content = ref(args.modelValue);
      const editorInstance = ref<InstanceType<typeof Editor>>();
      const editor = computed(() => editorInstance.value?.editor);
      return { args, content, editorInstance, editor };
    },
    template: `
      <div class="space-y-2">
        <EditorToolbar :editor="editor" />
        <Editor
          ref="editorInstance"
          v-bind="args"
          v-model="content"
          class="rounded-t-none border-t-0"
        />
      </div>
    `,
  }),
};

export const WithBubbleMenu: Story = {
  render: (args) => ({
    components: { Editor, EditorBubbleMenu },
    setup() {
      const content = ref(args.modelValue || '<p>Select some text to see the bubble menu appear!</p>');
      const editorInstance = ref<InstanceType<typeof Editor>>();
      const editor = computed(() => editorInstance.value?.editor);
      return { args, content, editorInstance, editor };
    },
    template: `
      <div class="relative">
        <EditorBubbleMenu :editor="editor" />
        <Editor
          ref="editorInstance"
          v-bind="args"
          v-model="content"
        />
      </div>
    `,
  }),
};

export const Complete: Story = {
  render: (args) => ({
    components: { Editor, EditorToolbar, EditorBubbleMenu },
    setup() {
      const content = ref(args.modelValue || `
        <h2>Complete Editor Example</h2>
        <p>This editor has both a <strong>toolbar</strong> and a <em>bubble menu</em>.</p>
        <p>Try selecting text to see the bubble menu appear, or use the toolbar for formatting.</p>
      `);
      const editorInstance = ref<InstanceType<typeof Editor>>();
      const editor = computed(() => editorInstance.value?.editor);
      return { args, content, editorInstance, editor };
    },
    template: `
      <div class="space-y-2 relative">
        <EditorToolbar :editor="editor" />
        <EditorBubbleMenu :editor="editor" />
        <Editor
          ref="editorInstance"
          v-bind="args"
          v-model="content"
          class="rounded-t-none border-t-0"
        />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: '<p>This editor is disabled and cannot be edited.</p>',
  },
  render: (args) => ({
    components: { Editor },
    setup() {
      const content = ref(args.modelValue);
      return { args, content };
    },
    template: `
      <Editor
        v-bind="args"
        v-model="content"
      />
    `,
  }),
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Write your story here...',
  },
  render: (args) => ({
    components: { Editor },
    setup() {
      const content = ref(args.modelValue);
      return { args, content };
    },
    template: `
      <Editor
        v-bind="args"
        v-model="content"
      />
    `,
  }),
};
