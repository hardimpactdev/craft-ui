# Write Component Tests

Use this skill when writing Vitest component tests for Storybook stories.

## Test Configuration

Tests run via `@storybook/addon-vitest` with Playwright browser provider.

**Config file:** `vitest.config.ts`
**Setup file:** `.storybook/vitest.setup.ts`

## Running Tests

```bash
# Run all tests
bun vitest --project=storybook --run

# Run tests in watch mode
bun vitest --project=storybook

# Run specific test file
bun vitest --project=storybook --run src/components/MyComponent.stories.ts

# Run tests matching pattern
bun vitest --project=storybook --run -t "Default"
```

## How Storybook Tests Work

Storybook's vitest addon automatically generates tests from stories. Each exported story becomes a test that:
1. Renders the story
2. Waits for the component to mount
3. Checks for errors during rendering

No manual test files needed - stories ARE the tests.

## Writing Testable Stories

### Basic Story (Auto-tested)

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import MyComponent from './MyComponent.vue';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// This story becomes a test automatically
export const Default: Story = {
  args: {
    label: 'Click me',
  },
};
```

### Story with Render Function

```typescript
export const WithSlots: Story = {
  render: (args) => ({
    components: { MyComponent },
    setup() {
      return { args };
    },
    template: `
      <MyComponent v-bind="args">
        <template #header>Header Content</template>
        <p>Default slot content</p>
      </MyComponent>
    `,
  }),
};
```

### Story with h() Function (for complex scenarios)

```typescript
import { h, ref } from 'vue';

export const Interactive: Story = {
  render: () => ({
    components: { MyComponent },
    setup() {
      const count = ref(0);
      return () => h('div', [
        h(MyComponent, {
          count: count.value,
          onClick: () => count.value++,
        }),
        h('p', `Count: ${count.value}`),
      ]);
    },
  }),
};
```

## Adding Interaction Tests

Use `@storybook/test` for interaction testing:

```typescript
import { expect, within, userEvent } from '@storybook/test';

export const WithInteraction: Story = {
  args: {
    label: 'Submit',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click button
    const button = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(button);

    // Assert result
    await expect(canvas.getByText('Submitted!')).toBeInTheDocument();
  },
};
```

### Common Interaction Patterns

```typescript
// Click
await userEvent.click(element);

// Type text
await userEvent.type(input, 'Hello world');

// Clear and type
await userEvent.clear(input);
await userEvent.type(input, 'New value');

// Keyboard
await userEvent.keyboard('{Enter}');
await userEvent.keyboard('{Escape}');

// Hover
await userEvent.hover(element);
await userEvent.unhover(element);

// Select option
await userEvent.selectOptions(select, 'option-value');

// Wait for element
await canvas.findByText('Loading complete');
```

## Mocking in Stories

### Mock NuxtLink (already configured globally)

NuxtLink is mocked globally in `.storybook/preview.ts`. No action needed.

### Mock Inertia

```typescript
import { mockSharedData, MockLink } from '../../.storybook/inertia-mock';

export const WithInertia: Story = {
  render: () => ({
    components: { MyComponent },
    provide: {
      // Provide mock Inertia data
      page: mockSharedData,
    },
    template: `<MyComponent />`,
  }),
};
```

### Mock API Calls

```typescript
import { fn } from '@storybook/test';

export const WithMockedAPI: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));

    // Verify mock was called
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

## Mocking Inertia Components

Components that use `usePage()` or `useForm()` from `@inertiajs/vue3` won't work in Storybook. Create mock versions instead.

### Pattern for Mock Components

```typescript
import { defineComponent, ref, provide, inject, computed } from 'vue';
import { mockUser, mockSharedData } from '../../.storybook/inertia-mock';

// Create a mock version that doesn't use usePage()
const MyComponentMock = defineComponent({
  name: 'MyComponentMock',
  props: {
    user: { type: Object, default: () => mockUser },
    // Add props that the real component gets from usePage()
  },
  setup(props) {
    // Re-implement the component logic without Inertia dependencies
    return { props };
  },
  template: `<!-- Same template as real component -->`,
});

// Use in stories
const meta: Meta<typeof MyComponentMock> = {
  title: 'Components/MyComponent',
  component: MyComponentMock,
  // ...
};
```

### Available Mocks in `.storybook/inertia-mock.ts`

```typescript
import {
  mockUser,           // User object with name, email, permissions
  mockUserWithAvatar, // User with avatar URL
  mockSharedData,     // Full SharedData object with navigation, auth, etc.
  MockLink,           // Mock Inertia Link component
  createMockUsePage,  // Factory to create custom usePage mock
  sampleNavItems,     // Sample navigation items
  sampleFooterItems,  // Sample footer nav items
} from '../../.storybook/inertia-mock';
```

### Components That Need Mocking

| Component | Uses | Mock Strategy |
|-----------|------|---------------|
| AppShell | `usePage().props.sidebarOpen` | Create mock with `initialOpen` prop |
| AppSidebar | `usePage().props.navigation` | Create mock with nav item props |
| NavUser | `usePage().props.auth.user` | Create mock with `user` prop |
| UserMenuContent | `usePage().props.navigation` | Create mock with callback props |
| DeleteUser | `useForm()` | Create mock with reactive form state |

### Providing Sidebar State

Components that inject sidebar state need a provider decorator:

```typescript
decorators: [
  (story) => ({
    setup() {
      provide('sidebar', {
        isOpen: ref(true),
        isMobile: ref(false),
        toggle: () => {},
      });
      return () => h('div', { class: 'flex h-screen' }, [h(story())]);
    },
  }),
],
```

## Common Issues & Solutions

### Issue: "Columns require an id when using a non-string header"

For Nuxt UI Table component, add `id` to columns:

```typescript
const columns = [
  { id: 'name', key: 'name', label: 'Name' },
  { id: 'email', key: 'email', label: 'Email' },
];
```

### Issue: "Cannot destructure property 'href' of 'undefined'"

NuxtLink mock issue. Ensure `.storybook/preview.ts` registers the mock:

```typescript
import { setup } from '@storybook/vue3-vite';
import NuxtLinkMock from './nuxt-link-mock';

setup((app) => {
  app.component('NuxtLink', NuxtLinkMock);
});
```

### Issue: "injection not found"

Component expects Vue provide/inject. Add provider in decorator:

```typescript
export const WithProvider: Story = {
  decorators: [
    (story) => ({
      setup() {
        provide('myKey', myValue);
        return () => h(story());
      },
    }),
  ],
};
```

### Issue: Test timeout

Increase timeout in story:

```typescript
export const SlowComponent: Story = {
  parameters: {
    test: {
      timeout: 10000, // 10 seconds
    },
  },
};
```

### Issue: "Found multiple elements" with getByPlaceholderText

Some components (like Command with CommandPalette) render duplicate inputs. Use `getAllBy*` and select the first:

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get all matching elements and use the first (visible) one
  const searchInputs = canvas.getAllByPlaceholderText('Search...');
  const searchInput = searchInputs[0];
  await userEvent.type(searchInput, 'query');
};
```

### Issue: Component uses usePage() and fails in Storybook

Create a mock component in the story file that accepts props instead of using `usePage()`. See "Mocking Inertia Components" section above.

### Issue: Modal/Popover content not found in tests

Modal content may render in a portal outside the canvas. For basic tests, verify the trigger works and skip complex modal interaction tests:

```typescript
export const OpenModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Just verify trigger button exists and is clickable
    const buttons = canvas.getAllByRole('button');
    const triggerButton = buttons.find(btn => btn.textContent?.includes('Open'));
    if (triggerButton) {
      await userEvent.click(triggerButton);
    }
  },
};
```

## Debugging Tests

### In Storybook UI

1. Open story in Storybook
2. Go to "Interactions" panel
3. Click "Run tests" to see step-by-step execution

### In Terminal

```bash
# Run with verbose output
bun vitest --project=storybook --run --reporter=verbose

# Run single test with debugging
bun vitest --project=storybook --run src/components/MyComponent.stories.ts --reporter=verbose
```

### Browser DevTools

Tests run in real Chromium. Add `debugger` statement:

```typescript
play: async ({ canvasElement }) => {
  debugger; // Opens DevTools when running in headed mode
  const canvas = within(canvasElement);
  // ...
},
```

Run headed:
```bash
bun vitest --project=storybook --browser.headless=false
```

## Test Organization

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.vue
│   │   └── Button.stories.ts    # Tests live with component
│   └── Card/
│       ├── Card.vue
│       └── Card.stories.ts
└── stories/
    └── nuxt-ui/                  # Nuxt UI component stories
        ├── data/
        │   └── Table.stories.ts
        └── forms/
            └── Input.stories.ts
```

## Accessibility Testing

The a11y addon is integrated with the test runner. Accessibility violations are automatically checked for each story.

### Configuration

**Preview config (`.storybook/preview.ts`):**
```typescript
parameters: {
  a11y: {
    test: 'todo',  // 'todo' = warnings, 'error' = fail tests, 'off' = disable
  },
},
```

**Vitest setup (`.storybook/vitest.setup.ts`):**
```typescript
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';

const project = setProjectAnnotations([projectAnnotations, a11yAddonAnnotations]);
```

### Common Accessibility Issues

#### Icon-only buttons need aria-label

```typescript
// Bad - no accessible name
<Button icon="i-lucide-settings" />

// Good - has aria-label
<Button icon="i-lucide-settings" aria-label="Settings" />
```

#### Color contrast violations

Some color variants may fail WCAG contrast requirements. Remove or adjust problematic variants:

```typescript
// Removed due to contrast issues
// <Button color="success">Success</Button>  // green
// <Button color="warning">Warning</Button>  // orange

// Keep accessible variants
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
```

#### Elements without visible text

Interactive elements need text that screen readers can announce:

```typescript
// Bad - link with only icon
<a href="/settings"><Icon name="i-lucide-cog" /></a>

// Good - link with aria-label
<a href="/settings" aria-label="Settings"><Icon name="i-lucide-cog" /></a>

// Good - link with visually hidden text
<a href="/settings">
  <Icon name="i-lucide-cog" />
  <span class="sr-only">Settings</span>
</a>
```

### Disabling a11y for Specific Stories

```typescript
export const DecorativeComponent: Story = {
  parameters: {
    a11y: {
      test: 'off',  // Disable a11y checks for this story
    },
  },
};
```

### Disabling Specific Rules

```typescript
export const WithDisabledRule: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};
```

### Viewing A11y Results

1. **In Storybook UI:** Click "Accessibility" tab in addons panel
2. **In test runner:** Run tests - violations show as warnings (todo) or errors (error mode)
3. **In CI:** Set `test: 'error'` to fail builds on violations

## Checklist for New Component Tests

- [ ] Create `ComponentName.stories.ts` alongside component
- [ ] Export `meta` with title, component, tags: ['autodocs']
- [ ] Add `Default` story with typical props
- [ ] Add variant stories (sizes, states, etc.)
- [ ] Add interaction tests for interactive components
- [ ] Ensure icon-only buttons have `aria-label`
- [ ] Check for color contrast issues in variants
- [ ] Run `bun vitest --project=storybook --run` to verify
- [ ] Check Storybook UI Accessibility panel for violations
