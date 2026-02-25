<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import type { AuthLayoutVariant } from '@/pages/auth/types';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Spinner } from '@/components/spinner';

export interface ResetPasswordForm {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface ResetPasswordErrors {
  email?: string;
  password?: string;
  password_confirmation?: string;
}

const props = withDefaults(
  defineProps<{
    /** Reset token from email */
    token: string;
    /** User's email address */
    email: string;
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: ResetPasswordErrors;
    /** Whether form is submitting */
    processing?: boolean;
    /** Layout variant */
    variant?: AuthLayoutVariant;
    /** App name (shown in split layout) */
    name?: string;
  }>(),
  {
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [form: ResetPasswordForm];
}>();

const form = ref<ResetPasswordForm>({
  email: props.email,
  password: '',
  password_confirmation: '',
  token: props.token,
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <AuthLayout
    title="Reset password"
    description="Please enter your new password below"
    :logo-link="logoLink"
    :variant="variant"
    :name="name"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            autocomplete="email"
            v-model="form.email"
            class="mt-1 block w-full"
            readonly
          />
          <InputError :message="errors?.email" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            autocomplete="new-password"
            v-model="form.password"
            class="mt-1 block w-full"
            autofocus
            placeholder="Password"
          />
          <InputError :message="errors?.password" />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            type="password"
            autocomplete="new-password"
            v-model="form.password_confirmation"
            class="mt-1 block w-full"
            placeholder="Confirm password"
          />
          <InputError :message="errors?.password_confirmation" />
        </div>

        <Button
          type="submit"
          class="mt-4 w-full"
          :disabled="processing"
        >
          <Spinner v-if="processing" class="mr-2" />
          Reset password
        </Button>
      </div>
    </form>
  </AuthLayout>
</template>
