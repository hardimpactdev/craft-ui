import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, onMounted, nextTick } from "vue"
import ChatConversation from "./ChatConversation.vue"
import ChatConversationContent from "./ChatConversationContent.vue"
import ChatConversationEmptyState from "./ChatConversationEmptyState.vue"
import ChatConversationScrollButton from "./ChatConversationScrollButton.vue"
import ChatConversationLoadMore from "./ChatConversationLoadMore.vue"
import ChatMessage from "../chat-message/ChatMessage.vue"
import ChatMessageContent from "../chat-message/ChatMessageContent.vue"
import ChatResponse from "../chat-response/ChatResponse.vue"

const meta = {
  title: "AI/ChatConversation",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A scrollable chat conversation container with automatic stick-to-bottom behavior. Wraps vue-stick-to-bottom and provides scroll context to child components via provide/inject.",
      },
    },
  },
} satisfies Meta<typeof ChatConversation>

export default meta
type Story = StoryObj<typeof meta>

const sampleMessages = [
  { id: 1, role: "user" as const, content: "What is Vue.js?" },
  {
    id: 2,
    role: "assistant" as const,
    content:
      "**Vue.js** is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable — you can use it as a library for a small part of your page, or as a full framework for a complex SPA.\n\nKey features:\n- Reactive data binding\n- Component-based architecture\n- Virtual DOM\n- Single-file components (`.vue` files)",
  },
  { id: 3, role: "user" as const, content: "How does reactivity work?" },
  {
    id: 4,
    role: "assistant" as const,
    content:
      "Vue 3 uses **Proxy-based reactivity**. When you create a reactive object with `ref()` or `reactive()`, Vue wraps it in a JavaScript Proxy that intercepts get/set operations.\n\n```js\nconst count = ref(0)\ncount.value++ // triggers re-render\n```\n\nWhen a component renders, Vue tracks which reactive properties were accessed. When those properties change, the component re-renders automatically.",
  },
  {
    id: 5,
    role: "user" as const,
    content: "What about computed properties?",
  },
  {
    id: 6,
    role: "assistant" as const,
    content:
      "Computed properties are **cached reactive values** that only re-evaluate when their dependencies change:\n\n```js\nconst firstName = ref('John')\nconst lastName = ref('Doe')\n\nconst fullName = computed(() => {\n  return `${firstName.value} ${lastName.value}`\n})\n```\n\nUnlike methods, computed properties are cached — they won't re-run unless `firstName` or `lastName` changes.",
  },
]

// Default: A conversation with messages and scroll button
export const Default: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
      ChatResponse,
    },
    setup() {
      return { messages: sampleMessages }
    },
    template: `
      <div class="flex h-[500px] flex-col border rounded-lg">
        <ChatConversation class="flex-1">
          <ChatConversationContent>
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :role="msg.role"
            >
              <ChatMessageContent>
                <ChatResponse v-if="msg.role === 'assistant'" :content="msg.content" />
                <span v-else>{{ msg.content }}</span>
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Empty state when no messages exist
export const EmptyState: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationEmptyState,
      ChatConversationScrollButton,
    },
    template: `
      <div class="flex h-[400px] flex-col border rounded-lg">
        <ChatConversation class="flex-1">
          <ChatConversationEmptyState>
            <div class="text-center">
              <p class="text-4xl">💬</p>
              <p class="text-muted-foreground mt-4 text-lg">Start a conversation</p>
              <p class="text-muted-foreground mt-1 text-sm">Ask me anything to get started.</p>
            </div>
          </ChatConversationEmptyState>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Many messages to demonstrate scroll and stick-to-bottom
export const Scrollable: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
      ChatResponse,
    },
    setup() {
      const messages = ref(
        Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
          content:
            i % 2 === 0
              ? `Question ${Math.ceil((i + 1) / 2)}: Tell me more about topic ${Math.ceil((i + 1) / 2)}.`
              : `This is a detailed response to question ${Math.ceil((i + 1) / 2)}. It contains enough text to demonstrate scrolling behavior in the chat conversation container. The stick-to-bottom feature keeps the view pinned to the latest message during streaming.`,
        })),
      )

      return { messages }
    },
    template: `
      <div class="flex h-[400px] flex-col border rounded-lg">
        <ChatConversation class="flex-1">
          <ChatConversationContent>
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :role="msg.role"
            >
              <ChatMessageContent>
                <ChatResponse v-if="msg.role === 'assistant'" :content="msg.content" />
                <span v-else>{{ msg.content }}</span>
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Simulated streaming - messages appear over time
export const Streaming: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
      ChatResponse,
    },
    setup() {
      const messages = ref([
        { id: 1, role: "user" as const, content: "Write me a haiku about coding." },
      ])

      const streamingContent = ref("")
      const fullResponse =
        "**A haiku about coding:**\n\nSilent keys tap on,\nLogic flows through glowing screens,\nBugs hide in the light."

      onMounted(() => {
        // Simulate streaming after a brief delay
        setTimeout(() => {
          messages.value.push({
            id: 2,
            role: "assistant" as const,
            content: "",
          })

          let i = 0
          const interval = setInterval(() => {
            if (i < fullResponse.length) {
              streamingContent.value = fullResponse.slice(0, i + 1)
              messages.value[1] = {
                ...messages.value[1],
                content: streamingContent.value,
              }
              i++
            } else {
              clearInterval(interval)
            }
          }, 30)
        }, 800)
      })

      return { messages }
    },
    template: `
      <div class="flex h-[400px] flex-col border rounded-lg">
        <ChatConversation class="flex-1">
          <ChatConversationContent>
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :role="msg.role"
            >
              <ChatMessageContent>
                <ChatResponse v-if="msg.role === 'assistant'" :content="msg.content" />
                <span v-else>{{ msg.content }}</span>
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Infinite scroll - load more messages when scrolling to top
export const InfiniteScroll: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatConversationLoadMore,
      ChatMessage,
      ChatMessageContent,
      ChatResponse,
    },
    setup() {
      const PAGE_SIZE = 5
      const TOTAL_MESSAGES = 25
      
      // Generate all messages (oldest first)
      const allMessages = Array.from({ length: TOTAL_MESSAGES }, (_, i) => ({
        id: i + 1,
        role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
        content:
          i % 2 === 0
            ? `Question ${i + 1}: Tell me more about topic ${i + 1}.`
            : `This is a detailed response to question ${i + 1}. It contains enough text to demonstrate scrolling behavior in the chat conversation container.`,
      }))

      // Start with only the most recent messages
      const displayedCount = ref(PAGE_SIZE)
      const messages = ref(allMessages.slice(-PAGE_SIZE))
      const isLoadingMore = ref(false)
      const hasMore = ref(TOTAL_MESSAGES > PAGE_SIZE)

      const handleLoadMore = async () => {
        if (isLoadingMore.value || !hasMore.value) return

        isLoadingMore.value = true

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Calculate how many more messages to add
        const currentStart = allMessages.length - displayedCount.value
        const newStart = Math.max(0, currentStart - PAGE_SIZE)
        const newMessages = allMessages.slice(newStart, currentStart)

        // Get scroll height before adding messages
        const scrollContainer = document.querySelector('#chat-conversation')
        const previousScrollHeight = scrollContainer?.scrollHeight || 0

        // Prepend older messages
        messages.value = [...newMessages, ...messages.value]
        displayedCount.value += newMessages.length

        // Check if we've loaded all messages
        hasMore.value = displayedCount.value < TOTAL_MESSAGES

        // Maintain scroll position after prepending
        await nextTick()
        const newScrollHeight = scrollContainer?.scrollHeight || 0
        const heightDifference = newScrollHeight - previousScrollHeight
        if (scrollContainer) {
          scrollContainer.scrollTop = heightDifference + 50
        }

        isLoadingMore.value = false
      }

      return {
        messages,
        isLoadingMore,
        hasMore,
        handleLoadMore,
      }
    },
    template: `
      <div class="flex h-[400px] flex-col border rounded-lg">
        <ChatConversation 
          class="flex-1"
          :has-more-messages="hasMore"
          :is-loading-more="isLoadingMore"
          @load-more="handleLoadMore"
        >
          <ChatConversationLoadMore />
          <ChatConversationContent>
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :role="msg.role"
            >
              <ChatMessageContent>
                <ChatResponse v-if="msg.role === 'assistant'" :content="msg.content" />
                <span v-else>{{ msg.content }}</span>
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}
