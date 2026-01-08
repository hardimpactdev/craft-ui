import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Select from '@nuxt/ui/components/Select.vue';
import SelectMenu from '@nuxt/ui/components/SelectMenu.vue';
import FormField from '@nuxt/ui/components/FormField.vue';

const meta: Meta<typeof Select> = {
  title: 'Nuxt UI/Forms/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Select>;

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
];

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

export const Default: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, fruits };
    },
    template: `<Select v-model="value" :items="fruits" aria-label="Select a fruit" />`,
  }),
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, fruits };
    },
    template: `<Select v-model="value" :items="fruits" placeholder="Select a fruit..." aria-label="Select a fruit" />`,
  }),
};

export const WithOptions: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, countries };
    },
    template: `<Select v-model="value" :items="countries" placeholder="Select a country..." aria-label="Select a country" />`,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    components: { Select, FormField },
    setup() {
      const value = ref('');
      return { value, countries };
    },
    template: `
      <FormField label="Country" name="country">
        <Select v-model="value" :items="countries" placeholder="Select a country..." />
      </FormField>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('apple');
      return { value, fruits };
    },
    template: `<Select v-model="value" :items="fruits" disabled aria-label="Disabled select" />`,
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref([]);
      return { value, fruits };
    },
    template: `<Select v-model="value" :items="fruits" multiple placeholder="Select fruits..." aria-label="Select multiple fruits" />`,
  }),
};

export const WithSearch: Story = {
  render: () => ({
    components: { SelectMenu },
    setup() {
      const value = ref('');
      return { value, countries };
    },
    template: `<SelectMenu v-model="value" :items="countries" searchable placeholder="Search countries..." aria-label="Search and select a country" />`,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, countries };
    },
    template: `<Select v-model="value" :items="countries" icon="i-lucide-globe" placeholder="Select a country..." aria-label="Select a country" />`,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { Select, FormField },
    setup() {
      const value = ref('');
      return { value, countries };
    },
    template: `
      <FormField label="Country" name="country" error="Please select a country">
        <Select v-model="value" :items="countries" placeholder="Select a country..." />
      </FormField>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, fruits };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Select v-model="value" :items="fruits" size="xs" placeholder="Extra small (xs)" aria-label="Extra small select" />
        <Select v-model="value" :items="fruits" size="sm" placeholder="Small (sm)" aria-label="Small select" />
        <Select v-model="value" :items="fruits" size="md" placeholder="Medium (md)" aria-label="Medium select" />
        <Select v-model="value" :items="fruits" size="lg" placeholder="Large (lg)" aria-label="Large select" />
        <Select v-model="value" :items="fruits" size="xl" placeholder="Extra large (xl)" aria-label="Extra large select" />
      </div>
    `,
  }),
};
