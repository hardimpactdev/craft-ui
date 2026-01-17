<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Spinner } from '@/components/spinner';

export interface ConfirmPasswordForm {
  password: string;
}

export interface ConfirmPasswordErrors {
  password?: string;
}

withDefaults(
  defineProps<{
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: ConfirmPasswordErrors;
    /** Whether form is submitting */
    processing?: boolean;
  }>(),
  {
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [form: ConfirmPasswordForm];
}>();

const form = ref<ConfirmPasswordForm>({
  password: '',
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <AuthLayout
    title="Confirm your password"
    description="This is a secure area of the application. Please confirm your password before continuing."
    :logo-link="logoLink"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-6">
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            v-model="form.password"
            class="mt-1 block w-full"
            required
            autocomplete="current-password"
            autofocus
          />
          <InputError :message="errors?.password" />
        </div>

        <div class="flex items-center">
          <Button class="w-full" :disabled="processing">
            <Spinner v-if="processing" class="mr-2" />
            Confirm Password
          </Button>
        </div>
      </div>
    </form>
  </AuthLayout>
</template>
