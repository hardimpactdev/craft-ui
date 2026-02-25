<script setup lang="ts">
import { ref, computed } from 'vue';
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import type { AuthLayoutVariant } from '@/pages/auth/types';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input-otp';
import { Spinner } from '@/components/spinner';

export interface TwoFactorForm {
  code: string;
}

export interface TwoFactorRecoveryForm {
  recovery_code: string;
}

export interface TwoFactorErrors {
  code?: string;
  recovery_code?: string;
}

withDefaults(
  defineProps<{
    /** URL for home/logo link */
    logoLink?: string;
    /** Form validation errors */
    errors?: TwoFactorErrors;
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
  submit: [form: TwoFactorForm];
  'submit:recovery': [form: TwoFactorRecoveryForm];
}>();

const showRecoveryInput = ref(false);
const code = ref('');
const recoveryCode = ref('');

const authConfigContent = computed(() => {
  if (showRecoveryInput.value) {
    return {
      title: 'Recovery Code',
      description:
        'Please confirm access to your account by entering one of your emergency recovery codes.',
      toggleText: 'login using an authentication code',
    };
  }

  return {
    title: 'Authentication Code',
    description:
      'Enter the authentication code provided by your authenticator application.',
    toggleText: 'login using a recovery code',
  };
});

const toggleRecoveryMode = () => {
  showRecoveryInput.value = !showRecoveryInput.value;
  code.value = '';
  recoveryCode.value = '';
};

const handleCodeSubmit = () => {
  emit('submit', { code: code.value });
};

const handleRecoverySubmit = () => {
  emit('submit:recovery', { recovery_code: recoveryCode.value });
};
</script>

<template>
  <AuthLayout
    :title="authConfigContent.title"
    :description="authConfigContent.description"
    :logo-link="logoLink"
    :variant="variant"
    :name="name"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <div class="space-y-6">
      <!-- OTP Code Input -->
      <template v-if="!showRecoveryInput">
        <form @submit.prevent="handleCodeSubmit" class="space-y-4">
          <div class="flex flex-col items-center justify-center space-y-3 text-center">
            <div class="flex w-full items-center justify-center">
              <InputOTP
                id="otp"
                v-model="code"
                :maxlength="6"
                :disabled="processing"
                autofocus
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    v-for="index in 6"
                    :key="index"
                    :index="index - 1"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <InputError :message="errors?.code" />
          </div>
          <Button type="submit" class="w-full" :disabled="processing">
            <Spinner v-if="processing" class="mr-2" />
            Continue
          </Button>
          <div class="text-center text-sm text-muted-foreground">
            <span>or you can </span>
            <button
              type="button"
              class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500"
              @click="toggleRecoveryMode"
            >
              {{ authConfigContent.toggleText }}
            </button>
          </div>
        </form>
      </template>

      <!-- Recovery Code Input -->
      <template v-else>
        <form @submit.prevent="handleRecoverySubmit" class="space-y-4">
          <Input
            type="text"
            placeholder="Enter recovery code"
            v-model="recoveryCode"
            autofocus
            required
          />
          <InputError :message="errors?.recovery_code" />
          <Button type="submit" class="w-full" :disabled="processing">
            <Spinner v-if="processing" class="mr-2" />
            Continue
          </Button>

          <div class="text-center text-sm text-muted-foreground">
            <span>or you can </span>
            <button
              type="button"
              class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500"
              @click="toggleRecoveryMode"
            >
              {{ authConfigContent.toggleText }}
            </button>
          </div>
        </form>
      </template>
    </div>
  </AuthLayout>
</template>
