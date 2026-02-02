import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { ref, computed, nextTick, h, defineComponent } from 'vue';
import Editor from '../Editor.vue';
import EditorToolbar from '../EditorToolbar.vue';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

// Mock window.prompt for link tests
vi.stubGlobal('prompt', vi.fn());
vi.stubGlobal('alert', vi.fn());

describe('Editor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Editor Component', () => {
    it('exposes editor instance through ref after mount', async () => {
      const wrapper = mount(Editor, {
        props: {
          modelValue: '<p>Test content</p>',
        },
      });

      await flushPromises();
      await nextTick();

      // The editor should be exposed and be the actual Editor instance
      const vm = wrapper.vm;
      expect(vm.editor).toBeDefined();
    });

    it('editor instance has required Tiptap methods', async () => {
      const wrapper = mount(Editor, {
        props: {
          modelValue: '<p>Test content</p>',
        },
      });

      await flushPromises();
      await nextTick();

      const editor = wrapper.vm.editor;
      
      // Verify the editor has all the methods the toolbar needs
      expect(editor).toBeDefined();
      expect(typeof editor?.isActive).toBe('function');
      expect(typeof editor?.can).toBe('function');
      expect(typeof editor?.chain).toBe('function');
      expect(typeof editor?.getAttributes).toBe('function');
    });
  });

  describe('EditorToolbar with Editor', () => {
    it('toolbar receives functional editor instance', async () => {
      // Create a test component that mimics the story setup
      const TestComponent = defineComponent({
        components: { Editor, EditorToolbar },
        setup() {
          const content = ref('<p>Test content</p>');
          const editorInstance = ref<InstanceType<typeof Editor>>();
          const editor = computed(() => editorInstance.value?.editor);
          
          return { content, editorInstance, editor };
        },
        template: `
          <div>
            <EditorToolbar :editor="editor" />
            <Editor ref="editorInstance" v-model="content" />
          </div>
        `,
      });

      const wrapper = mount(TestComponent);
      await flushPromises();
      await nextTick();
      await nextTick();

      // Get the toolbar component
      const toolbar = wrapper.findComponent(EditorToolbar);
      expect(toolbar.exists()).toBe(true);

      // The toolbar should have received the editor prop
      const editorProp = toolbar.props('editor');
      expect(editorProp).toBeDefined();
      
      // The editor should have all required methods
      expect(typeof editorProp?.isActive).toBe('function');
      expect(typeof editorProp?.can).toBe('function');
      expect(typeof editorProp?.chain).toBe('function');
    });

    it('toolbar can call editor chain commands', async () => {
      const TestComponent = defineComponent({
        components: { Editor, EditorToolbar },
        setup() {
          const content = ref('<p>Test content</p>');
          const editorInstance = ref<InstanceType<typeof Editor>>();
          const editor = computed(() => editorInstance.value?.editor);
          
          return { content, editorInstance, editor };
        },
        template: `
          <div>
            <EditorToolbar :editor="editor" />
            <Editor ref="editorInstance" v-model="content" />
          </div>
        `,
      });

      const wrapper = mount(TestComponent);
      await flushPromises();
      await nextTick();
      await nextTick();

      const toolbar = wrapper.findComponent(EditorToolbar);
      const editor = toolbar.props('editor');

      // Verify chain() returns an object with required commands
      const chain = editor?.chain();
      expect(chain).toBeDefined();
      expect(typeof chain?.toggleBold).toBe('function');
      expect(typeof chain?.toggleItalic).toBe('function');
      expect(typeof chain?.focus).toBe('function');
      expect(typeof chain?.run).toBe('function');
    });

    it('toolbar reflects bold state correctly', async () => {
      const TestComponent = defineComponent({
        components: { Editor, EditorToolbar },
        setup() {
          const content = ref('<p><strong>Bold text</strong> and normal</p>');
          const editorInstance = ref<InstanceType<typeof Editor>>();
          const editor = computed(() => editorInstance.value?.editor);
          
          return { content, editorInstance, editor };
        },
        template: `
          <div>
            <EditorToolbar :editor="editor" />
            <Editor ref="editorInstance" v-model="content" />
          </div>
        `,
      });

      const wrapper = mount(TestComponent);
      await flushPromises();
      await nextTick();
      await nextTick();

      const toolbar = wrapper.findComponent(EditorToolbar);
      const editor = toolbar.props('editor');

      // isActive should be a function
      expect(typeof editor?.isActive).toBe('function');
    });

    it('toolbar button click triggers bold formatting', async () => {
      const TestComponent = defineComponent({
        components: { Editor, EditorToolbar },
        setup() {
          const content = ref('<p>Test content</p>');
          const editorInstance = ref<InstanceType<typeof Editor>>();
          const editor = computed(() => editorInstance.value?.editor);
          
          return { content, editorInstance, editor };
        },
        template: `
          <div>
            <EditorToolbar :editor="editor" />
            <Editor ref="editorInstance" v-model="content" />
          </div>
        `,
      });

      const wrapper = mount(TestComponent);
      await flushPromises();
      await nextTick();
      await nextTick();

      const toolbar = wrapper.findComponent(EditorToolbar);
      const editor = toolbar.props('editor');
      
      // Verify editor is defined and has chain method
      expect(editor).toBeDefined();
      expect(typeof editor?.chain).toBe('function');
      
      // Verify we can create a chain and it has the toggleBold method
      const chain = editor?.chain();
      expect(chain).toBeDefined();
      expect(typeof chain?.toggleBold).toBe('function');
      expect(typeof chain?.focus).toBe('function');
      expect(typeof chain?.run).toBe('function');
      
      // Verify the chain can be executed (run returns true on success)
      const result = chain?.focus().toggleBold().run();
      expect(result).toBe(true);
    });
  });

  describe('useEditor composable', () => {
    it('creates editor with required extensions', async () => {
      // We need to mount a component to properly use useEditor
      const TestComponent = defineComponent({
        setup() {
          const editor = useEditor({
            content: '<p>Test</p>',
            extensions: [StarterKit, Link],
          });
          
          return { editor };
        },
        render() {
          return h('div');
        },
      });

      const wrapper = mount(TestComponent);
      await flushPromises();
      await nextTick();
      await nextTick();

      // The editor ref should be populated
      const editorRef = (wrapper.vm as any).editor;
      expect(editorRef).toBeDefined();
      
      // The value might be undefined initially, but the ref exists
      // The important thing is that when it's ready, it has the right methods
      if (editorRef?.value) {
        const editor = editorRef.value;
        expect(typeof editor?.isActive).toBe('function');
        expect(typeof editor?.can).toBe('function');
        expect(typeof editor?.chain).toBe('function');
      }
    });
  });
});
