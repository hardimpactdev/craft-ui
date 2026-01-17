<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import TextLink from '@/components/TextLink.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Spinner } from '@/components/spinner';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

const props = withDefaults(
  defineProps<{
    /** URL for login page */
    loginUrl?: string;
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: RegisterErrors;
    /** Whether form is submitting */
    processing?: boolean;
    /** Initial form values */
    modelValue?: Partial<RegisterForm>;
  }>(),
  {
    loginUrl: '/login',
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  submit: [form: RegisterForm];
  'update:modelValue': [form: RegisterForm];
}>();

const form = ref<RegisterForm>({
  name: props.modelValue?.name ?? '',
  email: props.modelValue?.email ?? '',
  password: props.modelValue?.password ?? '',
  password_confirmation: props.modelValue?.password_confirmation ?? '',
});

const updateForm = <K extends keyof RegisterForm>(key: K, value: RegisterForm[K]) => {
  form.value[key] = value;
  emit('update:modelValue', form.value);
};

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <AuthLayout
    title="Create an account"
    description="Enter your details below to create your account"
    :logo-link="logoLink"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            required
            autofocus
            :tabindex="1"
            autocomplete="name"
            placeholder="Full name"
            :model-value="form.name"
            @update:model-value="updateForm('name', $event as string)"
          />
          <InputError :message="errors?.name" />
        </div>

        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            :tabindex="2"
            autocomplete="email"
            placeholder="email@example.com"
            :model-value="form.email"
            @update:model-value="updateForm('email', $event as string)"
          />
          <InputError :message="errors?.email" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            :tabindex="3"
            autocomplete="new-password"
            placeholder="Password"
            :model-value="form.password"
            @update:model-value="updateForm('password', $event as string)"
          />
          <InputError :message="errors?.password" />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            type="password"
            required
            :tabindex="4"
            autocomplete="new-password"
            placeholder="Confirm password"
            :model-value="form.password_confirmation"
            @update:model-value="updateForm('password_confirmation', $event as string)"
          />
          <InputError :message="errors?.password_confirmation" />
        </div>

        <Button
          type="submit"
          class="mt-2 w-full"
          :tabindex="5"
          :disabled="processing"
        >
          <Spinner v-if="processing" class="mr-2" />
          Create account
        </Button>
      </div>

      <div class="text-center text-sm text-muted-foreground">
        Already have an account?
        <TextLink :href="loginUrl" :tabindex="6">Log in</TextLink>
      </div>
    </form>
  </AuthLayout>
</template>
