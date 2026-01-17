<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import TextLink from '@/components/TextLink.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Spinner } from '@/components/spinner';

export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordErrors {
  email?: string;
}

const props = withDefaults(
  defineProps<{
    /** Status message (e.g., "Password reset link sent") */
    status?: string;
    /** URL for login page */
    loginUrl?: string;
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: ForgotPasswordErrors;
    /** Whether form is submitting */
    processing?: boolean;
    /** Initial form values */
    modelValue?: Partial<ForgotPasswordForm>;
  }>(),
  {
    loginUrl: '/login',
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [form: ForgotPasswordForm];
  'update:modelValue': [form: ForgotPasswordForm];
}>();

const form = ref<ForgotPasswordForm>({
  email: props.modelValue?.email ?? '',
});

const updateForm = <K extends keyof ForgotPasswordForm>(key: K, value: ForgotPasswordForm[K]) => {
  form.value[key] = value;
  emit('update:modelValue', form.value);
};

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <AuthLayout
    title="Forgot password"
    description="Enter your email to receive a password reset link"
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

    <div class="space-y-6">
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autocomplete="off"
            autofocus
            placeholder="email@example.com"
            :model-value="form.email"
            @update:model-value="updateForm('email', $event as string)"
          />
          <InputError :message="errors?.email" />
        </div>

        <div class="my-6 flex items-center justify-start">
          <Button class="w-full" :disabled="processing">
            <Spinner v-if="processing" class="mr-2" />
            Email password reset link
          </Button>
        </div>
      </form>

      <div class="space-x-1 text-center text-sm text-muted-foreground">
        <span>Or, return to</span>
        <TextLink :href="loginUrl">log in</TextLink>
      </div>
    </div>
  </AuthLayout>
</template>
