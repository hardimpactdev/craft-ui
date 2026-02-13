import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import PromptInput from "./PromptInput.vue"
import PromptInputTextarea from "./PromptInputTextarea.vue"
import PromptInputFooter from "./PromptInputFooter.vue"
import PromptInputHeader from "./PromptInputHeader.vue"
import PromptInputTools from "./PromptInputTools.vue"
import PromptInputButton from "./PromptInputButton.vue"
import PromptInputSubmit from "./PromptInputSubmit.vue"
import PromptInputAttachments from "./PromptInputAttachments.vue"
import PromptInputAddAttachment from "./PromptInputAddAttachment.vue"
import PromptInputSelect from "./PromptInputSelect.vue"
import PromptInputSelectTrigger from "./PromptInputSelectTrigger.vue"
import PromptInputSelectContent from "./PromptInputSelectContent.vue"
import PromptInputSelectItem from "./PromptInputSelectItem.vue"
import { SelectValue } from "@/components/select"
import type { PromptInputMessage, ChatStatus } from "./types"
import {
  Globe,
  Sparkles,
  Bot,
  Zap,
  Brain,
  ImageIcon,
} from "lucide-vue-next"

const meta = {
  title: "AI/PromptInput",
  component: PromptInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A rich prompt input component for AI chat interfaces. Inspired by ChatGPT and other modern AI interfaces. Supports file attachments, model selection, keyboard shortcuts, and streaming status indicators.",
      },
    },
  },
  argTypes: {
    accept: {
      control: "text",
      description: "Accepted file types (e.g., 'image/*')",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files allowed",
    },
    maxFileSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    globalDrop: {
      control: "boolean",
      description: "Accept file drops anywhere on the document",
    },
  },
  args: {
    multiple: true,
    globalDrop: false,
  },
} satisfies Meta<typeof PromptInput>

export default meta
type Story = StoryObj<typeof meta>

// Default story - Simple prompt input with attachments support
export const Default: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputHeader,
      PromptInputTools,
      PromptInputSubmit,
      PromptInputAttachments,
      PromptInputAddAttachment,
    },
    setup() {
      const status = ref<ChatStatus>("ready")

      const handleSubmit = (message: PromptInputMessage) => {
        console.log("Submitted:", message)
        status.value = "submitted"
        setTimeout(() => {
          status.value = "streaming"
          setTimeout(() => {
            status.value = "ready"
          }, 2000)
        }, 500)
      }

      const handleStop = () => {
        status.value = "ready"
      }

      const handleError = (error: { code: string; message: string }) => {
        console.error("Error:", error)
      }

      return { args, status, handleSubmit, handleStop, handleError }
    },
    template: `
      <div class="w-[700px]">
        <PromptInput 
          v-bind="args" 
          accept="image/*,.pdf,.doc,.docx,.txt"
          :max-files="10"
          global-drop
          @submit="handleSubmit"
          @error="handleError"
        >
          <PromptInputHeader>
            <PromptInputAttachments />
          </PromptInputHeader>
          <PromptInputTextarea placeholder="What would you like to know?" />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAddAttachment />
            </PromptInputTools>
            <PromptInputSubmit :status="status" @stop="handleStop" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}

// Minimal version
export const Minimal: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputTools,
      PromptInputSubmit,
    },
    setup() {
      const handleSubmit = (message: PromptInputMessage) => {
        console.log("Submitted:", message)
      }

      return { args, handleSubmit }
    },
    template: `
      <div class="w-[600px]">
        <PromptInput v-bind="args" @submit="handleSubmit">
          <PromptInputTextarea placeholder="Ask me anything..." />
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}

// With model selector like ChatGPT
export const WithModelSelector: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputTools,
      PromptInputButton,
      PromptInputSubmit,
      PromptInputAddAttachment,
      PromptInputSelect,
      PromptInputSelectTrigger,
      PromptInputSelectContent,
      PromptInputSelectItem,
      SelectValue,
      Globe,
      Bot,
      Zap,
      Brain,
    },
    setup() {
      const model = ref("claude-3-5-sonnet")

      const handleSubmit = (message: PromptInputMessage) => {
        console.log("Model:", model.value, "Message:", message)
      }

      return { args, model, handleSubmit }
    },
    template: `
      <div class="w-[700px]">
        <PromptInput v-bind="args" @submit="handleSubmit">
          <PromptInputTextarea placeholder="What would you like to know?" />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAddAttachment />
              
              <PromptInputButton>
                <Globe class="size-4" />
                <span class="text-sm">Search</span>
              </PromptInputButton>
              
              <PromptInputSelect v-model="model">
                <PromptInputSelectTrigger>
                  <div class="flex items-center gap-1.5">
                    <Bot class="size-4" />
                    <SelectValue />
                  </div>
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  <PromptInputSelectItem value="claude-3-5-sonnet">
                    <div class="flex items-center gap-2">
                      <Brain class="size-4" />
                      Claude 3.5 Sonnet
                    </div>
                  </PromptInputSelectItem>
                  <PromptInputSelectItem value="claude-3-5-haiku">
                    <div class="flex items-center gap-2">
                      <Zap class="size-4" />
                      Claude 3.5 Haiku
                    </div>
                  </PromptInputSelectItem>
                  <PromptInputSelectItem value="gpt-4o">
                    <div class="flex items-center gap-2">
                      <Bot class="size-4" />
                      GPT-4o
                    </div>
                  </PromptInputSelectItem>
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}

// Streaming states demo
export const StreamingStates: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputTools,
      PromptInputSubmit,
    },
    setup() {
      const status = ref<ChatStatus>("ready")
      const statuses: ChatStatus[] = ["ready", "submitted", "streaming", "error"]
      let currentIndex = 0

      const handleSubmit = (message: PromptInputMessage) => {
        status.value = "submitted"
        setTimeout(() => {
          status.value = "streaming"
          setTimeout(() => {
            status.value = "ready"
          }, 3000)
        }, 1000)
      }

      const handleStop = () => {
        status.value = "ready"
        console.log("Stopped generation")
      }

      const cycleStatus = () => {
        currentIndex = (currentIndex + 1) % statuses.length
        status.value = statuses[currentIndex]
      }

      return { args, status, handleSubmit, handleStop, cycleStatus }
    },
    template: `
      <div class="w-[600px] space-y-4">
        <PromptInput v-bind="args" @submit="handleSubmit">
          <PromptInputTextarea placeholder="Try submitting to see status changes..." />
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit :status="status" @stop="handleStop" />
          </PromptInputFooter>
        </PromptInput>
        
        <div class="flex items-center justify-center gap-4">
          <span class="text-sm text-muted-foreground">
            Current status: <code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ status }}</code>
          </span>
          <button 
            @click="cycleStatus"
            class="text-sm underline text-primary hover:no-underline"
          >
            Cycle status
          </button>
        </div>
      </div>
    `,
  }),
}

// With file attachments - shows how attachments look with an image
export const WithAttachment: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputHeader,
      PromptInputTools,
      PromptInputSubmit,
      PromptInputAttachments,
      PromptInputAddAttachment,
    },
    setup() {
      const promptRef = ref<InstanceType<typeof PromptInput> | null>(null)

      const handleSubmit = (message: PromptInputMessage) => {
        console.log("Submitted:", message)
      }

      const handleError = (error: { code: string; message: string }) => {
        alert(error.message)
      }

      // Add mock attachment on mount
      const addMockAttachment = () => {
        setTimeout(() => {
          if (promptRef.value) {
            // Create a mock image
            const canvas = document.createElement('canvas')
            canvas.width = 300
            canvas.height = 200
            const ctx = canvas.getContext('2d')
            if (ctx) {
              const gradient = ctx.createLinearGradient(0, 0, 300, 200)
              gradient.addColorStop(0, '#3b82f6')
              gradient.addColorStop(1, '#8b5cf6')
              ctx.fillStyle = gradient
              ctx.fillRect(0, 0, 300, 200)
              ctx.fillStyle = 'rgba(255,255,255,0.3)'
              ctx.fillRect(20, 20, 100, 60)
              ctx.fillRect(180, 120, 100, 60)
              ctx.beginPath()
              ctx.arc(150, 100, 40, 0, Math.PI * 2)
              ctx.fill()
            }
            canvas.toBlob((blob) => {
              if (blob && promptRef.value) {
                const file = new File([blob], 'screenshot.png', { type: 'image/png' })
                promptRef.value.addFiles([file])
              }
            }, 'image/png')
          }
        }, 100)
      }

      return { args, promptRef, handleSubmit, handleError, addMockAttachment }
    },
    mounted() {
      this.addMockAttachment()
    },
    template: `
      <div class="w-[600px]">
        <PromptInput 
          ref="promptRef"
          v-bind="args" 
          accept="image/*,.pdf,.txt"
          :max-files="5"
          @submit="handleSubmit"
          @error="handleError"
        >
          <PromptInputHeader>
            <PromptInputAttachments />
          </PromptInputHeader>
          <PromptInputTextarea placeholder="What's in this screenshot?" />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAddAttachment />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}

// Dark mode optimized (matches the screenshot)
export const DarkModeStyle: Story = {
  parameters: {
    backgrounds: { default: "dark" },
    themes: {
      themeOverride: "dark",
    },
  },
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputTools,
      PromptInputButton,
      PromptInputSubmit,
      PromptInputAddAttachment,
      PromptInputSelect,
      PromptInputSelectTrigger,
      PromptInputSelectContent,
      PromptInputSelectItem,
      SelectValue,
      Globe,
      Sparkles,
    },
    setup() {
      const model = ref("gpt-4o")

      const handleSubmit = (message: PromptInputMessage) => {
        console.log("Submitted:", message)
      }

      return { args, model, handleSubmit }
    },
    template: `
      <div class="w-[700px] dark p-8 rounded-2xl" style="background: #212121;">
        <PromptInput v-bind="args" @submit="handleSubmit" class="bg-[#303030] rounded-2xl border-0">
          <PromptInputTextarea placeholder="What would you like to know?" class="min-h-14" />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAddAttachment class="text-gray-400 hover:text-white" />
              
              <PromptInputButton class="text-gray-400 hover:text-white">
                <Globe class="size-4" />
                <span class="text-sm">Search</span>
              </PromptInputButton>
              
              <PromptInputSelect v-model="model">
                <PromptInputSelectTrigger class="text-gray-400 hover:text-white">
                  <div class="flex items-center gap-1.5">
                    <Sparkles class="size-4" />
                    <SelectValue />
                  </div>
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  <PromptInputSelectItem value="gpt-4o">GPT-4o</PromptInputSelectItem>
                  <PromptInputSelectItem value="gpt-4o-mini">GPT-4o mini</PromptInputSelectItem>
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}

// Disabled state
export const Disabled: Story = {
  render: (args) => ({
    components: {
      PromptInput,
      PromptInputTextarea,
      PromptInputFooter,
      PromptInputTools,
      PromptInputAddAttachment,
      PromptInputSubmit,
      ImageIcon,
    },
    setup() {
      const handleSubmit = () => {}
      return { args, handleSubmit }
    },
    template: `
      <div class="w-[600px]">
        <PromptInput v-bind="args" @submit="handleSubmit">
          <PromptInputTextarea placeholder="This input is disabled..." disabled />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAddAttachment disabled />
            </PromptInputTools>
            <PromptInputSubmit disabled />
          </PromptInputFooter>
        </PromptInput>
      </div>
    `,
  }),
}
