import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, ref, onMounted, onUnmounted } from 'vue';
import { defineShortcuts, useKbd } from '@nuxt/ui/composables';
import Kbd from '@nuxt/ui/components/Kbd.vue';

const ShortcutsDemo = defineComponent({
  name: 'ShortcutsDemo',
  components: { Kbd },
  setup() {
    const lastAction = ref('');
    const count = ref(0);

    // Define keyboard shortcuts
    defineShortcuts({
      // Simple shortcuts
      'meta_k': () => {
        lastAction.value = 'Command palette opened (Meta+K)';
      },
      'meta_s': () => {
        lastAction.value = 'Save triggered (Meta+S)';
      },
      // Escape key
      'escape': () => {
        lastAction.value = 'Escape pressed - modal closed';
      },
      // Arrow keys
      'arrowup': () => {
        count.value++;
        lastAction.value = `Arrow Up - Count: ${count.value}`;
      },
      'arrowdown': () => {
        count.value--;
        lastAction.value = `Arrow Down - Count: ${count.value}`;
      },
      // Sequence shortcuts (g then d)
      'g-d': () => {
        lastAction.value = 'Go to Dashboard (g then d)';
      },
      'g-s': () => {
        lastAction.value = 'Go to Settings (g then s)';
      },
      // With shift
      'shift_?': () => {
        lastAction.value = 'Help opened (Shift+?)';
      },
    });

    // Use the kbd composable to detect platform
    const { macOS } = useKbd();

    return () => h('div', { class: 'space-y-6' }, [
      h('div', { class: 'p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg' }, [
        h('p', { class: 'text-sm text-zinc-600 dark:text-zinc-400 mb-2' },
          'Press any of the shortcuts below to see them in action:'),
        h('div', { class: 'min-h-8 text-lg font-medium' },
          lastAction.value || 'Waiting for input...'),
      ]),

      h('div', { class: 'space-y-4' }, [
        h('h3', { class: 'text-sm font-semibold text-zinc-500 dark:text-zinc-400' }, 'Available Shortcuts'),

        h('div', { class: 'grid gap-3' }, [
          // Meta+K
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Command Palette'),
            h('div', { class: 'flex gap-1' }, [
              h(Kbd, { value: macOS.value ? 'meta' : 'ctrl' }),
              h(Kbd, { value: 'K' }),
            ]),
          ]),
          // Meta+S
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Save'),
            h('div', { class: 'flex gap-1' }, [
              h(Kbd, { value: macOS.value ? 'meta' : 'ctrl' }),
              h(Kbd, { value: 'S' }),
            ]),
          ]),
          // Escape
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Close/Cancel'),
            h(Kbd, { value: 'escape' }),
          ]),
          // Arrow keys
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Increment/Decrement'),
            h('div', { class: 'flex gap-1' }, [
              h(Kbd, { value: 'arrowup' }),
              h(Kbd, { value: 'arrowdown' }),
            ]),
          ]),
          // Sequences
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Go to Dashboard'),
            h('div', { class: 'flex items-center gap-1' }, [
              h(Kbd, { value: 'G' }),
              h('span', { class: 'text-zinc-400' }, 'then'),
              h(Kbd, { value: 'D' }),
            ]),
          ]),
          h('div', { class: 'flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700' }, [
            h('span', 'Go to Settings'),
            h('div', { class: 'flex items-center gap-1' }, [
              h(Kbd, { value: 'G' }),
              h('span', { class: 'text-zinc-400' }, 'then'),
              h(Kbd, { value: 'S' }),
            ]),
          ]),
          // Shift+?
          h('div', { class: 'flex items-center justify-between py-2' }, [
            h('span', 'Help'),
            h('div', { class: 'flex gap-1' }, [
              h(Kbd, { value: 'shift' }),
              h(Kbd, { value: '?' }),
            ]),
          ]),
        ]),
      ]),
    ]);
  },
});

const meta: Meta = {
  title: 'Nuxt UI/Composables/defineShortcuts',
  component: ShortcutsDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`defineShortcuts\` composable enables keyboard shortcut definitions in your Vue components.

## Usage

\`\`\`ts
import { defineShortcuts } from '@hardimpactdev/liftoff-vue';

defineShortcuts({
  // Modifier + key (meta = Cmd on Mac, Ctrl on Windows)
  'meta_k': () => openCommandPalette(),
  'meta_s': () => save(),

  // Simple keys
  'escape': () => closeModal(),
  'enter': () => submit(),

  // Sequences (press g, then d)
  'g-d': () => goToDashboard(),
  'g-s': () => goToSettings(),

  // With shift
  'shift_?': () => openHelp(),

  // Arrow keys
  'arrowup': () => moveUp(),
  'arrowdown': () => moveDown(),
});
\`\`\`

## Key Format

- \`meta_k\` - Modifier + key (underscore separator)
- \`g-d\` - Sequence (hyphen separator)
- \`escape\`, \`enter\`, \`arrowup\` - Special keys
- \`shift_?\` - Shift combinations

## Platform Detection

Use \`useKbd\` to detect the platform and show appropriate key labels:

\`\`\`ts
import { useKbd } from '@hardimpactdev/liftoff-vue';

const { macOS, getKbdKey } = useKbd();
// macOS.value = true on Mac
// getKbdKey('meta') returns '⌘' on Mac, 'Ctrl' on Windows
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    components: { ShortcutsDemo },
    template: '<ShortcutsDemo />',
  }),
};
