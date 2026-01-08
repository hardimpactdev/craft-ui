import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import PinInput from '@nuxt/ui/components/PinInput.vue';

const meta: Meta<typeof PinInput> = {
  title: 'Nuxt UI/Forms/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
    mask: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const value = ref<string[]>([]);
      return { value };
    },
    template: `
      <div>
        <PinInput v-model="value" aria-label="Enter PIN code" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
  }),
};

export const WithLength4: Story = {
  name: 'With Length (4 digits)',
  render: () => ({
    components: { PinInput },
    setup() {
      const value = ref<string[]>([]);
      return { value };
    },
    template: `
      <div>
        <PinInput v-model="value" :length="4" aria-label="Enter 4-digit PIN" />
        <p class="mt-2 text-sm text-muted-foreground">4-digit PIN: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
  }),
};

export const WithLength6: Story = {
  name: 'With Length (6 digits)',
  render: () => ({
    components: { PinInput },
    setup() {
      const value = ref<string[]>([]);
      return { value };
    },
    template: `
      <div>
        <PinInput v-model="value" :length="6" aria-label="Enter 6-digit verification code" />
        <p class="mt-2 text-sm text-muted-foreground">6-digit code: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
  }),
};

export const Masked: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const value = ref<string[]>([]);
      return { value };
    },
    template: `
      <div>
        <PinInput v-model="value" mask aria-label="Enter masked PIN" />
        <p class="mt-2 text-sm text-muted-foreground">Masked PIN: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
  }),
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const value = ref<string[]>([]);
      return { value };
    },
    template: `
      <div>
        <PinInput v-model="value" placeholder="0" aria-label="Enter PIN with placeholder" />
        <p class="mt-2 text-sm text-muted-foreground">Value: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
  }),
};
