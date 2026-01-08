<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  theme: string;
  mode: 'light' | 'dark';
}>();

const inputValue = ref('');

function applyTheme() {
  document.documentElement.setAttribute('data-theme', props.theme);

  if (props.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

onMounted(() => {
  applyTheme();
});

watch(
  () => [props.theme, props.mode],
  () => {
    applyTheme();
  }
);
</script>

<template>
  <div class="p-8 space-y-8 bg-background text-foreground min-h-screen">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold">Theme Demo</h1>
      <p class="text-muted-foreground text-sm">
        <code class="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">{{ theme }}</code>
        <span class="mx-1">/</span>
        <code class="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">{{ mode }}</code>
      </p>
    </div>

    <!-- Color Palette - Compact -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Colors</h2>
      <div class="flex flex-wrap gap-2">
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-primary" title="Primary"></div>
          <span class="text-xs">Primary</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-secondary" title="Secondary"></div>
          <span class="text-xs">Secondary</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-accent" title="Accent"></div>
          <span class="text-xs">Accent</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-muted" title="Muted"></div>
          <span class="text-xs">Muted</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-destructive" title="Destructive"></div>
          <span class="text-xs">Destructive</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-success" title="Success"></div>
          <span class="text-xs">Success</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-warning" title="Warning"></div>
          <span class="text-xs">Warning</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="size-6 rounded bg-info" title="Info"></div>
          <span class="text-xs">Info</span>
        </div>
      </div>
    </section>

    <!-- Buttons -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Buttons</h2>
      <div class="flex flex-wrap gap-2">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="neutral">Neutral</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button color="primary" variant="outline">Outline</Button>
        <Button color="primary" variant="soft">Soft</Button>
        <Button color="primary" variant="ghost">Ghost</Button>
      </div>
    </section>

    <!-- Form Controls -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Form Controls</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div class="space-y-1.5">
          <label class="block text-sm font-medium">Input</label>
          <Input v-model="inputValue" placeholder="Enter text..." />
        </div>
        <div class="space-y-1.5">
          <label class="block text-sm font-medium">Textarea</label>
          <Textarea placeholder="Enter description..." :rows="2" />
        </div>
      </div>
    </section>

    <!-- Cards -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        <Card class="p-4">
          <h3 class="font-semibold text-sm">Card Title</h3>
          <p class="text-xs text-muted-foreground mt-1">Card content goes here.</p>
        </Card>
        <Card class="p-4">
          <h3 class="font-semibold text-sm">Another Card</h3>
          <p class="text-xs text-muted-foreground mt-1">With some badges:</p>
          <div class="flex gap-1 mt-2">
            <Badge color="primary" size="sm">Tag</Badge>
            <Badge color="success" size="sm">Done</Badge>
          </div>
        </Card>
        <div class="rounded-lg border bg-card p-4">
          <h3 class="font-semibold text-sm">Custom Card</h3>
          <p class="text-xs text-muted-foreground mt-1">Using CSS variables.</p>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Badges</h2>
      <div class="flex flex-wrap gap-2">
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="info">Info</Badge>
      </div>
    </section>

    <!-- Alerts -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Alerts</h2>
      <div class="space-y-2 max-w-xl">
        <Alert color="success" title="Success" description="Your changes have been saved." />
        <Alert color="warning" title="Warning" description="Please review before continuing." />
        <Alert color="error" title="Error" description="Something went wrong." />
      </div>
    </section>

    <!-- Typography -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Typography</h2>
      <div class="space-y-1 text-sm">
        <p class="text-foreground">Default text (foreground)</p>
        <p class="text-muted-foreground">Muted text (muted-foreground)</p>
        <p class="text-primary">Primary colored text</p>
      </div>
    </section>

    <!-- CSS Reference -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Usage</h2>
      <p class="text-xs text-muted-foreground">
        Copy theme variables from <code class="px-1 py-0.5 rounded bg-muted text-xs font-mono">src/themes.css</code> to customize.
      </p>
    </section>
  </div>
</template>
