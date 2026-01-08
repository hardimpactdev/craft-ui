import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import { useFileUpload } from '@nuxt/ui/composables';
import Button from '@nuxt/ui/components/Button.vue';

const FileUploadDemo = defineComponent({
  name: 'FileUploadDemo',
  components: { Button },
  setup() {
    const files = ref<File[]>([]);

    const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
      accept: 'image/*,.pdf,.doc,.docx',
      multiple: true,
      dropzone: true,
      onUpdate: (newFiles) => {
        files.value = [...files.value, ...newFiles];
      },
    });

    const removeFile = (index: number) => {
      files.value = files.value.filter((_, i) => i !== index);
    };

    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIcon = (type: string) => {
      if (type.startsWith('image/')) return 'i-lucide-image';
      if (type === 'application/pdf') return 'i-lucide-file-text';
      if (type.includes('word')) return 'i-lucide-file-text';
      return 'i-lucide-file';
    };

    return () => h('div', { class: 'space-y-4' }, [
      // Hidden file input
      h('input', {
        ref: inputRef,
        type: 'file',
        class: 'hidden',
        multiple: true,
        accept: 'image/*,.pdf,.doc,.docx',
      }),

      // Dropzone
      h('div', {
        ref: dropzoneRef,
        class: [
          'border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer',
          isDragging.value
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
            : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600',
        ],
        onClick: open,
      }, [
        h('div', { class: 'space-y-2' }, [
          h('div', { class: 'i-lucide-upload text-4xl mx-auto text-zinc-400' }),
          h('p', { class: 'text-zinc-600 dark:text-zinc-400' }, [
            h('span', { class: 'font-medium' }, 'Click to upload'),
            ' or drag and drop',
          ]),
          h('p', { class: 'text-sm text-zinc-500' }, 'Images, PDF, or Word documents'),
        ]),
      ]),

      // Alternative: Button trigger
      h('div', { class: 'flex justify-center' }, [
        h(Button, { variant: 'outline', onClick: open }, () => [
          h('span', { class: 'i-lucide-paperclip mr-2' }),
          'Choose Files',
        ]),
      ]),

      // File list
      files.value.length > 0 && h('div', { class: 'space-y-2' }, [
        h('h3', { class: 'text-sm font-medium text-zinc-700 dark:text-zinc-300' },
          `Uploaded Files (${files.value.length})`),
        h('ul', { class: 'space-y-2' },
          files.value.map((file, index) =>
            h('li', {
              key: `${file.name}-${index}`,
              class: 'flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg',
            }, [
              h('div', { class: 'flex items-center gap-3 min-w-0' }, [
                h('span', { class: `${getFileIcon(file.type)} text-xl text-zinc-500` }),
                h('div', { class: 'min-w-0' }, [
                  h('p', { class: 'text-sm font-medium truncate' }, file.name),
                  h('p', { class: 'text-xs text-zinc-500' }, formatSize(file.size)),
                ]),
              ]),
              h(Button, {
                variant: 'ghost',
                size: 'sm',
                icon: 'i-lucide-x',
                'aria-label': 'Remove file',
                onClick: () => removeFile(index),
              }),
            ])
          )
        ),
      ]),
    ]);
  },
});

const meta: Meta = {
  title: 'Nuxt UI/Composables/useFileUpload',
  component: FileUploadDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`useFileUpload\` composable provides file upload functionality with drag-and-drop support.

## Usage

\`\`\`ts
import { useFileUpload } from '@hardimpactdev/liftoff-vue';

const files = ref<File[]>([]);

const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
  accept: 'image/*,.pdf',
  multiple: true,
  dropzone: true,
  onUpdate: (newFiles) => {
    files.value = [...files.value, ...newFiles];
  },
});
\`\`\`

## Template

\`\`\`vue
<template>
  <!-- Hidden file input -->
  <input ref="inputRef" type="file" class="hidden" />

  <!-- Dropzone -->
  <div
    ref="dropzoneRef"
    :class="{ 'border-primary': isDragging }"
    @click="open"
  >
    Drop files here or click to upload
  </div>
</template>
\`\`\`

## Options

- \`accept\` - Allowed file types (MIME types or extensions)
- \`multiple\` - Allow multiple file selection
- \`dropzone\` - Enable drag-and-drop
- \`reset\` - Reset input after selection
- \`onUpdate\` - Callback when files are selected

## Returns

- \`isDragging\` - Ref indicating drag state
- \`open\` - Function to open file dialog
- \`inputRef\` - Ref for the file input element
- \`dropzoneRef\` - Ref for the dropzone element
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    components: { FileUploadDemo },
    template: '<FileUploadDemo />',
  }),
};
