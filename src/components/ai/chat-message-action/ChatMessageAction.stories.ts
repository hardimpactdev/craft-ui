import type { Meta, StoryObj } from "@storybook/vue3"
import ChatConversation from "../chat-conversation/ChatConversation.vue"
import ChatConversationContent from "../chat-conversation/ChatConversationContent.vue"
import ChatConversationScrollButton from "../chat-conversation/ChatConversationScrollButton.vue"
import ChatMessage from "../chat-message/ChatMessage.vue"
import ChatMessageContent from "../chat-message/ChatMessageContent.vue"
import ChatMessageToolbar from "../chat-message/ChatMessageToolbar.vue"
import ChatMessageActions from "./ChatMessageActions.vue"
import ChatMessageAction from "./ChatMessageAction.vue"
import ChatResponse from "../chat-response/ChatResponse.vue"
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Share,
  Bookmark,
  Flag,
} from "lucide-vue-next"

const meta = {
  title: "AI/ChatMessageAction",
  component: ChatMessageAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Action buttons for chat messages. Renders as ghost icon buttons with optional tooltips. Use inside ChatMessageActions within a ChatMessageToolbar.",
      },
    },
  },
  argTypes: {
    tooltip: {
      control: "text",
      description: "Optional tooltip text shown on hover",
    },
  },
} satisfies Meta<typeof ChatMessageAction>

export default meta
type Story = StoryObj<typeof meta>

// Actions with tooltips
export const WithTooltips: Story = {
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
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="Here's an example of action buttons with **tooltips**. Hover over the icons below to see them." />
              </ChatMessageContent>
              <ChatMessageToolbar>
                <ChatMessageActions>
                  <ChatMessageAction tooltip="Copy to clipboard">
                    <Copy class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Good response">
                    <ThumbsUp class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Bad response">
                    <ThumbsDown class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Regenerate response">
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

// Actions without tooltips
export const WithoutTooltips: Story = {
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
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="These action buttons have **no tooltips** — just bare icon buttons." />
              </ChatMessageContent>
              <ChatMessageToolbar>
                <ChatMessageActions>
                  <ChatMessageAction>
                    <Copy class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction>
                    <ThumbsUp class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction>
                    <ThumbsDown class="size-4" />
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

// Extended action set
export const ExtendedActions: Story = {
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
      Share,
      Bookmark,
      Flag,
    },
    template: `
      <div class="w-[600px] border rounded-lg">
        <ChatConversation>
          <ChatConversationContent>
            <ChatMessage role="assistant">
              <ChatMessageContent>
                <ChatResponse content="This shows an extended set of action buttons — copy, feedback, regenerate, share, bookmark, and report." />
              </ChatMessageContent>
              <ChatMessageToolbar>
                <ChatMessageActions>
                  <ChatMessageAction tooltip="Copy">
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
                  <ChatMessageAction tooltip="Share">
                    <Share class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Bookmark">
                    <Bookmark class="size-4" />
                  </ChatMessageAction>
                  <ChatMessageAction tooltip="Report">
                    <Flag class="size-4" />
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
