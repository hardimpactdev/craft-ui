import type { Meta, StoryObj } from "@storybook/vue3"
import ChatConversation from "../chat-conversation/ChatConversation.vue"
import ChatConversationContent from "../chat-conversation/ChatConversationContent.vue"
import ChatConversationScrollButton from "../chat-conversation/ChatConversationScrollButton.vue"
import ChatMessage from "./ChatMessage.vue"
import ChatMessageContent from "./ChatMessageContent.vue"
import ChatMessageToolbar from "./ChatMessageToolbar.vue"
import ChatMessageActions from "../chat-message-action/ChatMessageActions.vue"
import ChatMessageAction from "../chat-message-action/ChatMessageAction.vue"
import ChatResponse from "../chat-response/ChatResponse.vue"
import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-vue-next"

const meta = {
  title: "AI/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A role-aware chat message compound component. Uses CSS group modifiers (`is-user`, `is-assistant`) so child components can adapt their styling based on the message role.",
      },
    },
  },
  argTypes: {
    role: {
      control: "select",
      options: ["user", "assistant"],
      description: "The role of the message sender",
    },
  },
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

// User message
export const UserMessage: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="user">
              <ChatMessageContent>
                How do I center a div in CSS?
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Assistant message with markdown
export const AssistantMessage: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
      ChatResponse,
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="There are several ways to center a div:\n\n**Flexbox** (recommended):\n\`\`\`css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\`\`\`\n\n**Grid:**\n\`\`\`css\n.parent {\n  display: grid;\n  place-items: center;\n}\n\`\`\`" />
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Full conversation with both roles
export const Conversation: Story = {
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
      const messages = [
        { id: 1, role: "user" as const, content: "What is TypeScript?" },
        {
          id: 2,
          role: "assistant" as const,
          content:
            "**TypeScript** is a strongly-typed superset of JavaScript that compiles to plain JavaScript.\n\nKey benefits:\n- Static type checking\n- Better IDE support with autocompletion\n- Catches errors at compile time\n- Supports modern ES features",
        },
        {
          id: 3,
          role: "user" as const,
          content: "Can I use it with Vue?",
        },
        {
          id: 4,
          role: "assistant" as const,
          content:
            'Yes! Vue 3 has **first-class TypeScript support**. You can use `<script setup lang="ts">` in your single-file components:\n\n```vue\n<script setup lang="ts">\nconst props = defineProps<{\n  title: string\n  count?: number\n}>()\n</script>\n```',
        },
      ]

      return { messages }
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
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

// Message with toolbar and action buttons
export const WithToolbar: Story = {
  render: () => ({
    components: {
      ChatConversation,
      ChatConversationContent,
      ChatConversationScrollButton,
      ChatMessage,
      ChatMessageContent,
      ChatMessageToolbar,
      ChatMessageActions,
      ChatMessageAction,
      ChatResponse,
      Copy,
      ThumbsUp,
      ThumbsDown,
      RefreshCw,
    },
    setup() {
      const handleCopy = () => navigator.clipboard.writeText("Copied!")
      return { handleCopy }
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="user">
              <ChatMessageContent>
                Explain the difference between let and const.
              </ChatMessageContent>
            </ChatMessage>

            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="**\`let\`** allows reassignment:\n\n\`\`\`js\nlet count = 0\ncount = 1 // OK\n\`\`\`\n\n**\`const\`** prevents reassignment:\n\n\`\`\`js\nconst count = 0\ncount = 1 // TypeError!\n\`\`\`\n\nNote: \`const\` doesn't make objects immutable — you can still mutate properties of a \`const\` object." />
              </ChatMessageContent>
              <ChatMessageToolbar>
                <ChatMessageActions>
                  <ChatMessageAction tooltip="Copy" @click="handleCopy">
                    <Copy class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Good response">
                    <ThumbsUp class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Bad response">
                    <ThumbsDown class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Regenerate">
                    <RefreshCw class="size-4" />
                  </ChatMessageAction>
                </ChatMessageActions>
              </ChatMessageToolbar>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}
