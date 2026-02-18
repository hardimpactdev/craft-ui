import type { Meta, StoryObj } from "@storybook/vue3"
import { ref, onMounted } from "vue"
import ChatConversation from "../chat-conversation/ChatConversation.vue"
import ChatConversationContent from "../chat-conversation/ChatConversationContent.vue"
import ChatConversationScrollButton from "../chat-conversation/ChatConversationScrollButton.vue"
import ChatMessage from "../chat-message/ChatMessage.vue"
import ChatMessageContent from "../chat-message/ChatMessageContent.vue"
import ChatResponse from "./ChatResponse.vue"

const meta = {
  title: "AI/ChatResponse",
  component: ChatResponse,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Renders markdown content as HTML using `marked` with prose styling. Supports GFM (GitHub Flavored Markdown) including code blocks, tables, task lists, and more.",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "Markdown string to render",
    },
  },
} satisfies Meta<typeof ChatResponse>

export default meta
type Story = StoryObj<typeof meta>

// Basic markdown rendering
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
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="Here's a simple response with **bold**, *italic*, and \`inline code\`." />
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Rich markdown with all features
export const RichMarkdown: Story = {
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
      const content = `# Heading 1
## Heading 2
### Heading 3

Here's a paragraph with **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

#### Code Block

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`
}
\`\`\`

#### Unordered List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

#### Ordered List

1. Step one
2. Step two
3. Step three

#### Blockquote

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
> — Martin Fowler

#### Table

| Method | Description | Returns |
|--------|-------------|---------|
| \`ref()\` | Creates a reactive reference | \`Ref<T>\` |
| \`computed()\` | Creates a computed value | \`ComputedRef<T>\` |
| \`watch()\` | Watches reactive sources | \`WatchStopHandle\` |

#### Link

Check out [Vue.js](https://vuejs.org) for more information.`

      return { content }
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse :content="content" />
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}

// Simulated streaming content
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
      const content = ref("")
      const fullContent = `Here are 3 ways to improve your code:

**1. Use TypeScript**

TypeScript catches errors at compile time rather than runtime:

\`\`\`ts
// Before: runtime error
function add(a, b) { return a + b }
add("1", 2) // "12" — silent bug

// After: compile error
function add(a: number, b: number): number { return a + b }
add("1", 2) // Error: Argument of type 'string'...
\`\`\`

**2. Write Pure Functions**

Functions without side effects are easier to test and reason about.

**3. Keep Components Small**

Each component should do one thing well. If it's getting complex, split it up.`

      onMounted(() => {
        let i = 0
        const interval = setInterval(() => {
          if (i < fullContent.length) {
            content.value = fullContent.slice(0, i + 1)
            i++
          } else {
            clearInterval(interval)
          }
        }, 20)
      })

      return { content }
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="user">
              <ChatMessageContent>
                How can I improve my code?
              </ChatMessageContent>
            </ChatMessage>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse :content="content" />
              </ChatMessageContent>
            </ChatMessage>
          </ChatConversationContent>
          <ChatConversationScrollButton />
        </ChatConversation>
      </div>
    `,
  }),
}
