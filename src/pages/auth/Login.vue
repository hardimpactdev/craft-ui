<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import TextLink from '@/components/TextLink.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Spinner } from '@/components/spinner';

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

const props = withDefaults(
  defineProps<{
    /** Status message (e.g., "Password reset link sent") */
    status?: string;
    /** Show "Forgot password?" link */
    canResetPassword?: boolean;
    /** Show "Sign up" link */
    canRegister?: boolean;
    /** URL for forgot password page */
    forgotPasswordUrl?: string;
    /** URL for register page */
    registerUrl?: string;
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: LoginErrors;
    /** Whether form is submitting */
    processing?: boolean;
    /** Initial form values */
    modelValue?: Partial<LoginForm>;
  }>(),
  {
    canResetPassword: true,
    canRegister: true,
    forgotPasswordUrl: '/forgot-password',
    registerUrl: '/register',
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [form: LoginForm];
  'update:modelValue': [form: LoginForm];
}>();

const form = ref<LoginForm>({
  email: props.modelValue?.email ?? '',
  password: props.modelValue?.password ?? '',
  remember: props.modelValue?.remember ?? false,
});

const updateForm = <K extends keyof LoginForm>(key: K, value: LoginForm[K]) => {
  form.value[key] = value;
  emit('update:modelValue', form.value);
};

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <AuthLayout
    title="Log in to your account"
    description="Enter your email and password below to log in"
    :logo-link="logoLink"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <div
      v-if="status"
      class="mb-4 text-center text-sm font-medium text-green-600"
    >
      {{ status }}
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            autofocus
            :tabindex="1"
            autocomplete="email"
            placeholder="email@example.com"
            :model-value="form.email"
            @update:model-value="updateForm('email', $event as string)"
          />
          <InputError :message="errors?.email" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <TextLink
              v-if="canResetPassword"
              :href="forgotPasswordUrl"
              class="text-sm"
              :tabindex="5"
            >
              Forgot password?
            </TextLink>
          </div>
          <Input
            id="password"
            type="password"
            required
            :tabindex="2"
            autocomplete="current-password"
            placeholder="Password"
            :model-value="form.password"
            @update:model-value="updateForm('password', $event as string)"
          />
          <InputError :message="errors?.password" />
        </div>

        <div class="flex items-center justify-between">
          <Label for="remember" class="flex items-center space-x-3">
            <Checkbox
              id="remember"
              :tabindex="3"
              :checked="form.remember"
              @update:checked="updateForm('remember', $event)"
            />
            <span>Remember me</span>
          </Label>
        </div>

        <Button
          type="submit"
          class="mt-4 w-full"
          :tabindex="4"
          :disabled="processing"
        >
          <Spinner v-if="processing" class="mr-2" />
          Log in
        </Button>
      </div>

      <div
        v-if="canRegister"
        class="text-center text-sm text-muted-foreground"
      >
        Don't have an account?
        <TextLink :href="registerUrl" :tabindex="5">Sign up</TextLink>
      </div>
    </form>
  </AuthLayout>
</template>
