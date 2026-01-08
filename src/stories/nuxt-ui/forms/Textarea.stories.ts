import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Textarea from '@nuxt/ui/components/Textarea.vue';
import FormField from '@nuxt/ui/components/FormField.vue';

const meta: Meta<typeof Textarea> = {
  title: 'Nuxt UI/Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Textarea v-model="value" aria-label="Text area" />`,
  }),
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Textarea v-model="value" placeholder="Enter your message here..." aria-label="Message" />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Textarea, FormField },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField label="Description" name="description">
        <Textarea v-model="value" placeholder="Enter a description..." />
      </FormField>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('This textarea is disabled and cannot be edited.');
      return { value };
    },
    template: `<Textarea v-model="value" disabled aria-label="Disabled textarea" />`,
  }),
};

export const Autoresize: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Textarea v-model="value" autoresize placeholder="Start typing and the textarea will grow..." aria-label="Auto-resize textarea" />`,
  }),
};

export const AutoresizeWithMaxRows: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Textarea v-model="value" autoresize :maxrows="5" placeholder="This textarea will grow up to 5 rows..." aria-label="Textarea with max rows" />`,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { Textarea, FormField },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <FormField label="Description" name="description" error="Description is required">
        <Textarea v-model="value" placeholder="Enter a description..." />
      </FormField>
    `,
  }),
};

export const WithRows: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `<Textarea v-model="value" :rows="6" placeholder="This textarea has 6 rows..." aria-label="Textarea with 6 rows" />`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Textarea v-model="value" size="xs" placeholder="Extra small (xs)" aria-label="Extra small textarea" />
        <Textarea v-model="value" size="sm" placeholder="Small (sm)" aria-label="Small textarea" />
        <Textarea v-model="value" size="md" placeholder="Medium (md)" aria-label="Medium textarea" />
        <Textarea v-model="value" size="lg" placeholder="Large (lg)" aria-label="Large textarea" />
        <Textarea v-model="value" size="xl" placeholder="Extra large (xl)" aria-label="Extra large textarea" />
      </div>
    `,
  }),
};
