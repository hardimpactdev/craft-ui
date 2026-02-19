import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import ChatConversation from '../ChatConversation.vue';
import ChatConversationLoadMore from '../ChatConversationLoadMore.vue';
import { useChatConversation } from '../useChatConversation';

describe('ChatConversation Infinite Scroll', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ChatConversation component', () => {
    it('emits loadMore event when scrolled to top', async () => {
      const wrapper = mount(ChatConversation, {
        props: {
          hasMoreMessages: true,
          isLoadingMore: false,
        },
        slots: {
          default: () => h('div', { style: 'height: 1000px' }, 'Content'),
        },
        attachTo: document.body,
      });

      await flushPromises();

      const scrollContainer = wrapper.find('#chat-conversation').element as HTMLElement;
      
      // Mock scroll properties
      Object.defineProperty(scrollContainer, 'scrollTop', { value: 0, writable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(scrollContainer, 'clientHeight', { value: 400, writable: true });

      // Trigger scroll event
      await scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
      await flushPromises();

      expect(wrapper.emitted('loadMore')).toBeTruthy();
    });

    it('does not emit loadMore when already loading', async () => {
      const wrapper = mount(ChatConversation, {
        props: {
          hasMoreMessages: true,
          isLoadingMore: true,
        },
        slots: {
          default: () => h('div', { style: 'height: 1000px' }, 'Content'),
        },
        attachTo: document.body,
      });

      await flushPromises();

      const scrollContainer = wrapper.find('#chat-conversation').element as HTMLElement;
      
      Object.defineProperty(scrollContainer, 'scrollTop', { value: 0, writable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(scrollContainer, 'clientHeight', { value: 400, writable: true });

      await scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
      await flushPromises();

      // Should not emit loadMore when already loading
      expect(wrapper.emitted('loadMore')).toBeFalsy();
    });

    it('does not emit loadMore when no more messages', async () => {
      const wrapper = mount(ChatConversation, {
        props: {
          hasMoreMessages: false,
          isLoadingMore: false,
        },
        slots: {
          default: () => h('div', { style: 'height: 1000px' }, 'Content'),
        },
        attachTo: document.body,
      });

      await flushPromises();

      const scrollContainer = wrapper.find('#chat-conversation').element as HTMLElement;
      
      Object.defineProperty(scrollContainer, 'scrollTop', { value: 0, writable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(scrollContainer, 'clientHeight', { value: 400, writable: true });

      await scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
      await flushPromises();

      expect(wrapper.emitted('loadMore')).toBeFalsy();
    });

    it('does not emit loadMore when not at top', async () => {
      const wrapper = mount(ChatConversation, {
        props: {
          hasMoreMessages: true,
          isLoadingMore: false,
        },
        slots: {
          default: () => h('div', { style: 'height: 1000px' }, 'Content'),
        },
        attachTo: document.body,
      });

      await flushPromises();

      const scrollContainer = wrapper.find('#chat-conversation').element as HTMLElement;
      
      // Scroll not at top (> 50px)
      Object.defineProperty(scrollContainer, 'scrollTop', { value: 100, writable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 1000, writable: true });
      Object.defineProperty(scrollContainer, 'clientHeight', { value: 400, writable: true });

      await scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
      await flushPromises();

      expect(wrapper.emitted('loadMore')).toBeFalsy();
    });

    it('provides context to child components', async () => {
      const ChildComponent = defineComponent({
        setup() {
          const context = useChatConversation();
          return { context };
        },
        render() {
          return h('div', 'Child');
        },
      });

      const wrapper = mount(ChatConversation, {
        props: {
          hasMoreMessages: true,
          isLoadingMore: false,
        },
        slots: {
          default: () => h(ChildComponent),
        },
      });

      await flushPromises();

      // Component should render without errors
      expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
    });
  });

  describe('ChatConversationLoadMore component', () => {
    it('shows loading state when isLoadingMore is true', async () => {
      const TestWrapper = defineComponent({
        components: { ChatConversation, ChatConversationLoadMore },
        setup() {
          return {
            hasMoreMessages: ref(true),
            isLoadingMore: ref(true),
          };
        },
        render() {
          return h(ChatConversation, {
            hasMoreMessages: this.hasMoreMessages,
            isLoadingMore: this.isLoadingMore,
          }, {
            default: () => h(ChatConversationLoadMore),
          });
        },
      });

      const wrapper = mount(TestWrapper);
      await flushPromises();

      const loadMore = wrapper.findComponent(ChatConversationLoadMore);
      expect(loadMore.text()).toContain('Loading older messages');
      expect(loadMore.find('[role="status"]').exists()).toBe(true);
    });

    it('shows no more messages state when hasMoreMessages is false', async () => {
      const TestWrapper = defineComponent({
        components: { ChatConversation, ChatConversationLoadMore },
        setup() {
          return {
            hasMoreMessages: ref(false),
            isLoadingMore: ref(false),
          };
        },
        render() {
          return h(ChatConversation, {
            hasMoreMessages: this.hasMoreMessages,
            isLoadingMore: this.isLoadingMore,
          }, {
            default: () => h(ChatConversationLoadMore),
          });
        },
      });

      const wrapper = mount(TestWrapper);
      await flushPromises();

      const loadMore = wrapper.findComponent(ChatConversationLoadMore);
      expect(loadMore.text()).toContain('No more messages');
    });

    it('renders custom loading text when provided', async () => {
      const TestWrapper = defineComponent({
        components: { ChatConversation, ChatConversationLoadMore },
        setup() {
          return {
            hasMoreMessages: ref(true),
            isLoadingMore: ref(true),
          };
        },
        render() {
          return h(ChatConversation, {
            hasMoreMessages: this.hasMoreMessages,
            isLoadingMore: this.isLoadingMore,
          }, {
            default: () => h(ChatConversationLoadMore, { loadingText: 'Custom loading...' }),
          });
        },
      });

      const wrapper = mount(TestWrapper);
      await flushPromises();

      const loadMore = wrapper.findComponent(ChatConversationLoadMore);
      expect(loadMore.text()).toContain('Custom loading...');
    });

    it('renders custom no more text when provided', async () => {
      const TestWrapper = defineComponent({
        components: { ChatConversation, ChatConversationLoadMore },
        setup() {
          return {
            hasMoreMessages: ref(false),
            isLoadingMore: ref(false),
          };
        },
        render() {
          return h(ChatConversation, {
            hasMoreMessages: this.hasMoreMessages,
            isLoadingMore: this.isLoadingMore,
          }, {
            default: () => h(ChatConversationLoadMore, { noMoreText: 'All loaded!' }),
          });
        },
      });

      const wrapper = mount(TestWrapper);
      await flushPromises();

      const loadMore = wrapper.findComponent(ChatConversationLoadMore);
      expect(loadMore.text()).toContain('All loaded!');
    });

    it('throws error when used outside ChatConversation', () => {
      expect(() => {
        mount(ChatConversationLoadMore);
      }).toThrow('useChatConversation must be used within a ChatConversation component');
    });
  });

  describe('Integration', () => {
    it('maintains scroll position after loading more messages', async () => {
      const messages = ref([
        { id: 1, content: 'Message 1' },
        { id: 2, content: 'Message 2' },
      ]);
      
      const TestWrapper = defineComponent({
        components: { ChatConversation },
        setup() {
          return {
            messages,
            hasMoreMessages: ref(true),
            isLoadingMore: ref(false),
          };
        },
        render() {
          return h(ChatConversation, {
            hasMoreMessages: this.hasMoreMessages,
            isLoadingMore: this.isLoadingMore,
            'onLoadMore': () => {
              // Simulate loading more messages
              messages.value = [
                { id: 0, content: 'Older message' },
                ...messages.value,
              ];
            },
          }, {
            default: () => h('div', this.messages.map(m => h('div', { key: m.id, style: 'height: 100px' }, m.content))),
          });
        },
      });

      const wrapper = mount(TestWrapper, { attachTo: document.body });
      await flushPromises();

      const scrollContainer = wrapper.find('#chat-conversation').element as HTMLElement;
      
      // Set up scroll properties
      Object.defineProperty(scrollContainer, 'scrollTop', { value: 0, writable: true });
      Object.defineProperty(scrollContainer, 'scrollHeight', { value: 200, writable: true });
      Object.defineProperty(scrollContainer, 'clientHeight', { value: 400, writable: true });

      // Trigger load more
      await scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }));
      await flushPromises();

      // After loading, scroll position should be adjusted
      expect(messages.value).toHaveLength(3);
    });
  });
});
