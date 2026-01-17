<script setup lang="ts">
import AuthLayout from '@/layouts/auth/AuthLayout.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/button';
import { Spinner } from '@/components/spinner';

withDefaults(
  defineProps<{
    /** Status message (e.g., "verification-link-sent") */
    status?: string;
    /** URL for logout */
    logoutUrl?: string;
    /** URL for home/logo link */
    logoLink?: string;
    /** Whether form is submitting */
    processing?: boolean;
  }>(),
  {
    logoutUrl: '/logout',
    logoLink: '/',
    processing: false,
  }
);

const emit = defineEmits<{
  resend: [];
  logout: [];
}>();

const handleResend = () => {
  emit('resend');
};

const handleLogout = () => {
  emit('logout');
};
</script>

<template>
  <AuthLayout
    title="Verify email"
    description="Please verify your email address by clicking on the link we just emailed to you."
    :logo-link="logoLink"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <div
      v-if="status === 'verification-link-sent'"
      class="mb-4 text-center text-sm font-medium text-green-600"
    >
      A new verification link has been sent to the email address you
      provided during registration.
    </div>

    <div class="space-y-6 text-center">
      <Button
        :disabled="processing"
        variant="secondary"
        @click="handleResend"
      >
        <Spinner v-if="processing" class="mr-2" />
        Resend verification email
      </Button>

      <TextLink
        :href="logoutUrl"
        as="button"
        class="mx-auto block text-sm"
        @click.prevent="handleLogout"
      >
        Log out
      </TextLink>
    </div>
  </AuthLayout>
</template>
