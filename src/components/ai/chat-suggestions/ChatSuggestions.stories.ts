import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import ChatSuggestions from "./ChatSuggestions.vue"
import ChatSuggestion from "./ChatSuggestion.vue"

const meta = {
  title: "AI/ChatSuggestions",
  component: ChatSuggestions,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A horizontal scrollable row of suggestion pills. Users click a suggestion to populate the prompt input. Uses ScrollArea internally with a hidden scrollbar for clean overflow.",
      },
    },
  },
} satisfies Meta<typeof ChatSuggestions>

export default meta
type Story = StoryObj<typeof meta>

// Default suggestions
export const Default: Story = {
  render: () => ({
    components: { ChatSuggestions, ChatSuggestion },
    setup() {
      const suggestions = [
        "What can you help me with?",
        "Write a haiku",
        "Explain quantum computing",
        "Debug my code",
      ]

      const handleClick = (suggestion: string) => {
        console.log("Selected:", suggestion)
      }

      return { suggestions, handleClick }
    },
    template: `
      <div class="w-[500px]">
        <ChatSuggestions>
          <ChatSuggestion
            v-for="s in suggestions"
            :key="s"
            :suggestion="s"
            @click="handleClick"
          />
        </ChatSuggestions>
      </div>
    `,
  }),
}

// Many suggestions that overflow horizontally
export const Overflow: Story = {
  render: () => ({
    components: { ChatSuggestions, ChatSuggestion },
    setup() {
      const suggestions = [
        "Tell me a joke",
        "Write Python code",
        "Explain Docker",
        "What is Kubernetes?",
        "Compare React vs Vue",
        "Database optimization tips",
        "How to deploy to AWS",
        "Best practices for REST APIs",
      ]

      const handleClick = (suggestion: string) => {
        console.log("Selected:", suggestion)
      }

      return { suggestions, handleClick }
    },
    template: `
      <div class="w-[400px]">
        <ChatSuggestions>
          <ChatSuggestion
            v-for="s in suggestions"
            :key="s"
            :suggestion="s"
            @click="handleClick"
          />
        </ChatSuggestions>
      </div>
    `,
  }),
}

// Interactive: selected suggestion fills input
export const Interactive: Story = {
  render: () => ({
    components: { ChatSuggestions, ChatSuggestion },
    setup() {
      const suggestions = [
        "Summarize this article",
        "Translate to Spanish",
        "Make it more concise",
        "Add more detail",
      ]

      const selected = ref("")

      const handleClick = (suggestion: string) => {
        selected.value = suggestion
      }

      return { suggestions, selected, handleClick }
    },
    template: `
      <div class="w-[500px] space-y-4">
        <ChatSuggestions>
          <ChatSuggestion
            v-for="s in suggestions"
            :key="s"
            :suggestion="s"
            @click="handleClick"
          />
        </ChatSuggestions>

        <div class="border rounded-lg px-4 py-3 text-sm">
          <span v-if="selected" class="text-foreground">{{ selected }}</span>
          <span v-else class="text-muted-foreground">Click a suggestion above...</span>
        </div>
      </div>
    `,
  }),
}
