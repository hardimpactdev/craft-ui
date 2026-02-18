This is a Storybook project which manages the Craft UI library. The library provides Vue.js components, composables, and utilities for rapidly building user interfaces with the Craft stack using Reka UI primitives and shadcn-vue styling patterns.

## Design Principles

Craft UI follows a set of design principles emphasizing calm, clean interfaces that don't overwhelm users.

### 1. Calm Over Loud

Interfaces should feel quiet and professional. Avoid visual noise.

- **Subtle shadows** - Use `shadow-xs` (0 1px 2px rgba(0,0,0,0.05)) instead of heavy drop shadows
- **Soft borders** - Light zinc borders (zinc-200/zinc-300) that define without dominating
- **No shadows in dark mode** - Dark interfaces feel cleaner without shadows
- **Muted colors** - Zinc neutrals over pure blacks/whites

### 2. Simplicity Over Complexity

Every element should earn its place. Remove anything that doesn't serve a purpose.

- **Single responsibility** - Each component does one thing well
- **Minimal variants** - Only add variants when there's a clear use case
- **Consistent patterns** - Same spacing, same radii, same shadows across components
- **Whitespace is design** - Let elements breathe; don't cram

### 3. Hierarchy Through Subtlety

Guide user attention without shouting.

- **Weight over color** - Use font-weight and size before reaching for color
- **Progressive disclosure** - Show what's needed, hide complexity
- **Intentional contrast** - Primary actions stand out; secondary fades back
- **Depth through borders** - Prefer borders over shadows for separation

### 4. Consistency Is Trust

Users shouldn't have to learn your UI twice.

- **Unified sizing** - Base height of 40px (h-10) for buttons, inputs, selects
- **Shared radii** - rounded-lg (8px) for containers, rounded-md (6px) for smaller elements
- **Predictable spacing** - Use Tailwind's spacing scale consistently
- **Same interactions** - Hover states, focus rings, transitions feel identical

### 5. Details Matter

Polish separates good from great.

- **Inset highlights** - Solid buttons get subtle top highlights for depth
- **Darker bottom borders** - Inputs have slightly darker bottom borders for grounding
- **Smooth transitions** - 150ms transitions for state changes
- **Accessible focus** - Clear, consistent focus rings for keyboard navigation

### Visual Reference

| Property | Value | Usage |
|----------|-------|-------|
| Base height | 40px (h-10) | Buttons, inputs, selects |
| Small height | 32px (h-8) | Compact variants |
| XS height | 24px (h-6) | Tags, small buttons |
| Base radius | 8px (rounded-lg) | Cards, modals, buttons |
| Small radius | 6px (rounded-md) | Inputs, badges |
| Card radius | 12px (rounded-xl) | Cards, modals |
| Shadow | 0 1px 2px rgba(0,0,0,0.05) | Inputs, selects, outline buttons |
| Inset shadow | inset 0 1px white/20 | All solid button variants |
| Border color | zinc-200 (light) / zinc-700 (dark) | Inputs, selects, cards |
| Bottom border | zinc-300 (light) | Inputs, selects (darker bottom) |
| Select padding-right | 40px (pe-10) | Space for chevron icon |
| Primary color | zinc-800 (light) / white (dark) | Solid buttons, links |

## Technologies Used

### Reka UI

UI primitives are provided by [Reka UI](https://reka-ui.com) - a headless, accessible component library for Vue. Components are built using shadcn-vue patterns with class-variance-authority for type-safe styling variants.

**Component Architecture**

- **Reka UI primitives** - Headless, accessible base components (Tooltip, Dialog, Select, etc.)
- **shadcn-vue patterns** - Class variance authority for variants, `cn()` utility for class merging
- **Tailwind CSS v4** - Utility-first styling with CSS variables
- **No auto-imports** - Components must be explicitly imported from the package

### Storybook

Storybook v10 is being used for component documentation and development.

#### Disabling the Onboarding Checklist

Storybook 10.1 includes a checklist-based onboarding widget in the sidebar. There is no official configuration option to disable it. The checklist state is stored in `~/.storybook/settings.json` and managed at runtime via `window.__STORYBOOK_API__.internal_checklistStore`.

To disable it, all checklist items must be marked as `"skipped"` or `"done"`. Run this in the browser console:

```javascript
const api = window.__STORYBOOK_API__;
const store = api.internal_universalChecklistStore;
const openItems = Object.entries(store.getState().items)
  .filter(([_, v]) => v.status === 'open')
  .map(([k]) => k);
openItems.forEach(item => api.internal_checklistStore.skip(item));
```

This persists to `~/.storybook/settings.json` and the widget will remain hidden.

### Vue 3

All components and composables are written in Vue 3 with composition API.

### TypeScript

The components and composables use TypeScript.

### TailwindCSS 4

TailwindCSS v4 is being used.

### Runtime

The bun runtime is being used instead of node.

## Structure

- `./src/components` - Custom craft components (navigation, layouts, etc.)
- `./src/components/ai` - AI chat components (prompt-input, chat-conversation, chat-message, etc.)
- `./src/composables` - Vue composables (useAppearance, useInitials, useLanguage)
- `./src/layouts` - Layout components for apps
- `./src/vite` - Vite plugin configuration
- `./src/lib` - Utility functions (cn, __, can)
- `./src/stories` - Component stories and examples
- `./.storybook` - Storybook configuration and mocks
- `index.ts` - Main exports

### AI Component Architecture

AI components live under `src/components/ai/` and follow a compound component pattern:

| Directory | Purpose |
|-----------|---------|
| `prompt-input/` | Chat input with file attachments, keyboard shortcuts |
| `chat-conversation/` | Scroll container with stick-to-bottom behavior |
| `chat-message/` | Role-aware message layout (user/assistant) |
| `chat-message-action/` | Action buttons with optional tooltips |
| `chat-response/` | Token-based markdown rendering with component overrides |
| `chat-suggestions/` | Horizontal pill buttons for follow-up suggestions |

Each component family follows this file structure:

```
component-name/
  types.ts              # Interfaces, InjectionKey
  useComponentName.ts   # inject() composable for child access
  ComponentName.vue     # Root: provide() context
  ComponentChild.vue    # Children: use composable or group modifiers
  index.ts              # Barrel exports
```

Key conventions:
- Root components `provide()` context, children `inject()` via composable
- Context type uses `InjectionKey<T>` from Vue
- Composable throws if used outside root component
- All components accept `class?: HTMLAttributes["class"]` and merge with `cn()`
- Barrel exports: types first, then composables, then components as `default` exports

#### ChatResponse Token Rendering

`ChatResponse` uses `marked.lexer()` to produce an AST, then `renderTokens()` maps each token to a VNode. When `components` is omitted or empty, `chatResponseDefaults` is used. Consumers override individual elements via the `components` prop (merged over defaults):

```vue
<ChatResponse :content="msg" />
<ChatResponse :content="msg" :components="{ code: MyCodeBlock }" />
```

File structure:
```
chat-response/
  types.ts              # ChatResponseComponents type map
  renderTokens.ts       # Token[] + ComponentMap → VNode[]
  ChatResponse.vue      # marked.lexer() + renderTokens()
  components/           # Styled default components (one per token type)
    ChatResponseHeading.vue
    ChatResponseCode.vue
    ...
    index.ts            # Exports all + chatResponseDefaults preset
  index.ts              # Barrel exports
```

Styled rendering uses `chatResponseDefaults` by default.

## Testing

Component tests run via Storybook's Vitest addon with Playwright browser provider.

### Running Tests

```bash
# Run all component tests
bun vitest --project=storybook --run

# Run specific story file
bun vitest --project=storybook --run src/components/MyComponent.stories.ts

# Run in watch mode
bun vitest --project=storybook
```

### Key Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration with Storybook project |
| `.storybook/vitest.setup.ts` | Test setup file |
| `.storybook/inertia-mock.ts` | Mock data for Inertia-dependent components |
| `.storybook/inertia-link-mock.ts` | Mock Inertia Link for Storybook |
| `.storybook/preview.ts` | Global setup with vue-router mock |

### Storybook Mocks

**Vue Router**: Storybook includes a mock vue-router (`createMemoryHistory`) in `preview.ts` for components that use `useRoute()` internally. This is set up globally - no action needed in stories.

**Inertia**: Components using `usePage()` or `useForm()` from Inertia need special handling:
- Components like `AppShell` have been made defensive - they check for injected state first, then try `usePage()` with a fallback
- For other components, create mock versions in the story file that accept props instead
- See `.claude/skills/write-component-tests.md` for patterns

### Available Mocks

Import from `.storybook/inertia-mock.ts`:
- `mockUser` / `mockUserWithAvatar` - User objects
- `mockSharedData` - Full SharedData with navigation, auth
- `sampleNavItems` / `sampleFooterItems` - Navigation items

### Accessibility Guidelines

When creating new components, apply aria labels for screen reader support:

- **Icon-only buttons**: Always add `aria-label` describing the action
  ```vue
  <Button icon="i-lucide-x" aria-label="Close dialog" />
  ```
- **Interactive elements**: Ensure visible text or `aria-label` is present
- **Form inputs**: Use `<label>` elements or `aria-label` for inputs without visible labels
- **Images**: Add `alt` text for meaningful images, empty `alt=""` for decorative ones

## UI Components

This package uses Reka UI for accessible primitives and shadcn-vue for styling patterns. Components must be imported explicitly:

```vue
<script setup>
import { Button } from '@hardimpactdev/craft-ui'
import { Input } from '@hardimpactdev/craft-ui'
</script>

<template>
  <Button>Click me</Button>
  <Input v-model="value" />
</template>
```

See [Reka UI documentation](https://reka-ui.com) for available primitives.

## Vite Plugin

The package provides a Vite configuration helper for Laravel + Inertia + Vue apps:

```typescript
// vite.config.ts
import { defineCraftConfig } from '@hardimpactdev/craft-ui/vite';

export default defineCraftConfig({
  laravel: {
    input: ['resources/js/app.ts'],
  },
});
```

The plugin includes:
- Laravel Vite plugin
- Tailwind CSS v4 with custom theme variables
- TailwindCSS
- Vue dev tools
- i18n support

## Custom Components

Craft provides custom components built on top of Reka UI primitives:

### Layout Components
- **AppShell** - Application shell with sidebar support
- **AppSidebar** - Collapsible sidebar navigation
- **AppContent** - Main content area
- **NavMain** / **NavFooter** / **NavUser** - Navigation components
- **Breadcrumbs** - Breadcrumb navigation
- **UserInfo** - User avatar and info display

### Kanban Components
Drag-and-drop kanban board powered by vue-draggable-plus.

- **Kanban** - Main container for columns
- **KanbanColumn** - Column wrapper
- **KanbanColumnHeader** - Header with title, count, badge
- **KanbanColumnCards** - Draggable cards container (use v-model)
- **KanbanColumnFooter** - Footer slot
- **KanbanCard** - Individual card (can be `as="button"` for clickable)

```vue
<Kanban>
  <KanbanColumn id="todo">
    <KanbanColumnHeader heading="To Do" :count="3" badge="New" />
    <KanbanColumnCards v-model="todoCards" group="kanban">
      <template #card="{ card }">
        <KanbanCard :id="card.id" :heading="card.title" />
      </template>
    </KanbanColumnCards>
  </KanbanColumn>
</Kanban>
```

### Command Components
Command palette built with Reka UI Command primitive and shadcn-vue patterns.

- **Command** - Standalone command palette
- **CommandModal** - Modal version with keyboard shortcut (⌘K)

```vue
<CommandModal v-model:open="isOpen" :groups="groups" @select="handleSelect" />
```

### Chart Components
Chart.js integration with Craft-style defaults.

- **Chart** - Generic chart (type: line, bar, area, pie, doughnut)
- **ChartLine** - Line chart
- **ChartBar** - Bar chart
- **ChartArea** - Area chart (line with fill)
- **ChartPie** - Pie chart
- **ChartDoughnut** - Doughnut chart

```vue
<ChartLine :data="{ labels: ['Jan', 'Feb'], datasets: [{ data: [10, 20] }] }" class="h-64" />
```

### Utility Components

- **PlaceholderPattern** - SVG diagonal line pattern for placeholder/empty content areas

**Important**: PlaceholderPattern uses `absolute inset-0` positioning. Parent containers must have `relative` and `overflow-hidden` to contain it properly:

```vue
<div class="relative overflow-hidden rounded-xl bg-muted/50">
  <PlaceholderPattern />
</div>
```

## Theming Components

The theme uses a clean, modern design with subtle borders and zinc neutrals.

### Architecture Overview

Theming involves two layers:

1. **CSS Variables** (`src/theme.css`) - Base color palette
2. **Component Styles** (`src/style.css`) - Component-specific styling

### Component Structure

Components use `data-slot` attributes for part identification and class-variance-authority for type-safe variants:

| Selector | Element | Used In |
|----------|---------|---------|
| `[data-slot="button"]` | Button element | Button |
| `[data-slot="input"]` | Input element | Input |
| `[data-slot="alert"]` | Alert container | Alert |
| `[data-slot="card"]` | Card container | Card |

### 1. CSS Variables (`src/theme.css`)

Base color palette and design tokens:

```css
@theme inline {
  /* Craft accent color system */
  --color-accent: var(--color-zinc-800);
  --color-accent-content: var(--color-zinc-800);
  --color-accent-foreground: var(--color-white);
  --color-muted: var(--color-zinc-100);
  --color-muted-foreground: var(--color-zinc-500);
  --color-border: var(--color-zinc-200);
  --color-ring: var(--color-zinc-400);
}

@layer theme {
  :root {
    --background: oklch(1 0 0);                     /* white */
    --foreground: oklch(0.141 0.005 285.823);       /* zinc-950 */
    --primary: oklch(0.274 0.006 286.033);          /* zinc-800 */
    --border: oklch(0.94 0.002 286.32);             /* soft border */
    --radius: 0.5rem;                               /* 8px */
  }

  .dark {
    --background: oklch(0.141 0.005 285.823);       /* zinc-950 */
    --foreground: oklch(0.985 0.004 286.32);        /* zinc-50 */
    --primary: oklch(0.985 0.004 286.32);           /* white */
    --border: oklch(0.370 0.013 285.805);           /* zinc-700 */
    --color-accent: var(--color-white);
    --color-accent-foreground: var(--color-zinc-800);
  }
}
```

### 2. Component Variants

Components use class-variance-authority for type-safe variants:

```typescript
// src/components/button/buttonVariants.ts
import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 3. Component-Specific Styling

Style components using Tailwind utilities in their respective files:

#### Button

```vue
<template>
  <Primitive
    data-slot="button"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
```

#### Input

```vue
<template>
  <input
    data-slot="input"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
      'border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs',
      'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      props.class,
    )"
  >
</template>
```

### Key Files Reference

| File | Purpose |
|------|---------|
| `src/style.css` | Global styles and Tailwind imports |
| `src/theme.css` | Base color palette and CSS variables |
| `src/lib/cn.ts` | Class merging utility (clsx + tailwind-merge) |
| `src/components/*/variants.ts` | Component variant definitions |

### Common Customization Tasks

**Change primary color:**
1. Update `--primary` in `src/theme.css`
2. Update `--color-accent` values

**Adjust border softness:**
1. Modify `--border` in `src/theme.css`
2. Higher OKLCH lightness = softer

**Change border radius:**
1. Update `--radius` in `src/theme.css`
2. Update variant definitions in component files

**Add component variants:**
1. Edit the variant object in the component's variants file
2. Use `cva` for type-safe variant definitions

**Style with data-slot:**
1. Components expose `data-slot` attributes for targeting
2. Use these in global CSS for cross-cutting concerns

### Useful Resources

- [Reka UI Docs](https://reka-ui.com) - Headless primitives
- [shadcn-vue](https://www.shadcn-vue.com) - Component patterns
- [class-variance-authority](https://cva.style) - Type-safe variants
- [OKLCH Color Picker](https://oklch.com/) - For generating color values
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility classes reference

## Publishing a New Release

**IMPORTANT**: Always use the release skill for publishing new versions.

```
/release
```

Or reference the skill documentation at `.claude/skills/release/SKILL.md`.

The release skill handles:
1. Version bumping (patch/minor/major)
2. Committing and pushing changes
3. Creating GitHub releases
4. Triggering the publish workflow to GitHub Packages

The package is published to GitHub Packages (`npm.pkg.github.com`), not npmjs.org. Consuming projects need a `.npmrc` configured for GitHub Packages authentication.
