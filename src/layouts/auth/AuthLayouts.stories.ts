import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import AuthLayout from './AuthLayout.vue';
import AuthSimpleLayout from './AuthSimpleLayout.vue';
import AuthCardLayout from './AuthCardLayout.vue';
import AuthSplitLayout from './AuthSplitLayout.vue';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Label } from '@/components/label';
import { Checkbox } from '@/components/checkbox';

// Mock logo component for stories
const MockLogo = {
  template: `
    <svg class="size-full fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l12 6v10l-12-6V18zm28 0v10l-12 6V24l12-6z"/>
    </svg>
  `,
};

// Mock login form for stories
const MockLoginForm = {
  components: { Input, Button, Label, Checkbox },
  template: `
    <form class="flex flex-col gap-6" @submit.prevent>
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input id="email" type="email" placeholder="email@example.com" autocomplete="email" />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <a href="#" class="text-sm underline-offset-4 hover:underline">Forgot password?</a>
          </div>
          <Input id="password" type="password" placeholder="Password" autocomplete="current-password" />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label for="remember" class="text-sm font-normal">Remember me</Label>
        </div>
        <Button type="submit" class="w-full">Log in</Button>
      </div>
      <div class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <a href="#" class="underline underline-offset-4 hover:text-foreground">Sign up</a>
      </div>
    </form>
  `,
};

// Base meta for auth layouts
const baseMeta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    logoLink: { control: 'text' },
  },
};

// ===== AuthLayout (Default/Wrapper) =====
const authLayoutMeta: Meta<typeof AuthLayout> = {
  ...baseMeta,
  title: 'Layouts/Auth/AuthLayout',
  component: AuthLayout,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Default auth layout wrapper. Uses AuthSimpleLayout internally. This is the recommended default for auth pages.',
      },
    },
  },
};

export default authLayoutMeta;
type AuthLayoutStory = StoryObj<typeof authLayoutMeta>;

export const Default: AuthLayoutStory = {
  args: {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
    logoLink: '/',
  },
  render: (args) => ({
    components: { AuthLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthLayout>
    `,
  }),
};

// ===== AuthSimpleLayout =====
const simpleLayoutMeta: Meta<typeof AuthSimpleLayout> = {
  ...baseMeta,
  title: 'Layouts/Auth/AuthSimpleLayout',
  component: AuthSimpleLayout,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Simple centered auth layout. Clean and minimal design with logo, title, description, and form content centered on the page.',
      },
    },
  },
};

export const Simple: StoryObj<typeof simpleLayoutMeta> = {
  args: {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
    logoLink: '/',
  },
  render: (args) => ({
    components: { AuthSimpleLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthSimpleLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthSimpleLayout>
    `,
  }),
};

export const SimpleWithoutLink: StoryObj<typeof simpleLayoutMeta> = {
  args: {
    title: 'Create an account',
    description: 'Enter your details to get started',
  },
  render: (args) => ({
    components: { AuthSimpleLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthSimpleLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthSimpleLayout>
    `,
  }),
};

// ===== AuthCardLayout =====
const cardLayoutMeta: Meta<typeof AuthCardLayout> = {
  ...baseMeta,
  title: 'Layouts/Auth/AuthCardLayout',
  component: AuthCardLayout,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Card-based auth layout. Features a subtle muted background with the form content contained within a card. Great for a more polished look.',
      },
    },
  },
};

export const Card: StoryObj<typeof cardLayoutMeta> = {
  args: {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
    logoLink: '/',
  },
  render: (args) => ({
    components: { AuthCardLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthCardLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthCardLayout>
    `,
  }),
};

export const CardWithoutLink: StoryObj<typeof cardLayoutMeta> = {
  args: {
    title: 'Reset your password',
    description: 'Enter your email to receive a password reset link',
  },
  render: (args) => ({
    components: { AuthCardLayout, MockLogo, Input, Button, Label },
    setup() {
      return { args };
    },
    template: `
      <AuthCardLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <form class="flex flex-col gap-6" @submit.prevent>
          <div class="grid gap-2">
            <Label for="email">Email address</Label>
            <Input id="email" type="email" placeholder="email@example.com" autocomplete="email" />
          </div>
          <Button type="submit" class="w-full">Send reset link</Button>
        </form>
      </AuthCardLayout>
    `,
  }),
};

// ===== AuthSplitLayout =====
const splitLayoutMeta: Meta<typeof AuthSplitLayout> = {
  ...baseMeta,
  title: 'Layouts/Auth/AuthSplitLayout',
  component: AuthSplitLayout,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Split-screen auth layout. Features a dark sidebar with branding on the left (hidden on mobile) and the form content on the right. Ideal for enterprise applications.',
      },
    },
  },
  argTypes: {
    ...baseMeta.argTypes,
    name: { control: 'text' },
  },
};

export const Split: StoryObj<typeof splitLayoutMeta> = {
  args: {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
    name: 'Acme Inc',
    logoLink: '/',
  },
  render: (args) => ({
    components: { AuthSplitLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthSplitLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthSplitLayout>
    `,
  }),
};

export const SplitWithoutLink: StoryObj<typeof splitLayoutMeta> = {
  args: {
    title: 'Create an account',
    description: 'Enter your details to get started',
    name: 'Acme Inc',
  },
  render: (args) => ({
    components: { AuthSplitLayout, MockLogo, MockLoginForm },
    setup() {
      return { args };
    },
    template: `
      <AuthSplitLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <MockLoginForm />
      </AuthSplitLayout>
    `,
  }),
};
