import type { Meta, StoryObj } from '@storybook/vue3';
import LoginPage from './Login.vue';
import RegisterPage from './Register.vue';
import ForgotPasswordPage from './ForgotPassword.vue';
import ResetPasswordPage from './ResetPassword.vue';
import ConfirmPasswordPage from './ConfirmPassword.vue';
import VerifyEmailPage from './VerifyEmail.vue';
import TwoFactorChallengePage from './TwoFactorChallenge.vue';

const MockLogo = {
  template: `
    <svg class="size-full fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l12 6v10l-12-6V18zm28 0v10l-12 6V24l12-6z"/>
    </svg>
  `,
};

const splitArgs = {
  variant: 'split' as const,
  name: 'Acme Inc',
};

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Auth/Split',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ===== Login =====

export const Login: StoryObj<typeof LoginPage> = {
  args: {
    ...splitArgs,
    canResetPassword: true,
    canRegister: true,
    forgotPasswordUrl: '/forgot-password',
    registerUrl: '/register',
    logoLink: '/',
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('Login submitted:', form);
      return { args, handleSubmit };
    },
    template: `
      <LoginPage v-bind="args" @submit="handleSubmit">
        <template #logo><MockLogo /></template>
      </LoginPage>
    `,
  }),
};

export const LoginWithStatus: StoryObj<typeof LoginPage> = {
  args: {
    ...splitArgs,
    status: 'Password reset link sent successfully!',
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <LoginPage v-bind="args">
        <template #logo><MockLogo /></template>
      </LoginPage>
    `,
  }),
};

export const LoginWithErrors: StoryObj<typeof LoginPage> = {
  args: {
    ...splitArgs,
    errors: { email: 'These credentials do not match our records.' },
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <LoginPage v-bind="args">
        <template #logo><MockLogo /></template>
      </LoginPage>
    `,
  }),
};

export const LoginProcessing: StoryObj<typeof LoginPage> = {
  args: {
    ...splitArgs,
    processing: true,
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <LoginPage v-bind="args">
        <template #logo><MockLogo /></template>
      </LoginPage>
    `,
  }),
};

// ===== Register =====

export const Register: StoryObj<typeof RegisterPage> = {
  args: {
    ...splitArgs,
    loginUrl: '/login',
    logoLink: '/',
  },
  render: (args) => ({
    components: { RegisterPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('Register submitted:', form);
      return { args, handleSubmit };
    },
    template: `
      <RegisterPage v-bind="args" @submit="handleSubmit">
        <template #logo><MockLogo /></template>
      </RegisterPage>
    `,
  }),
};

export const RegisterWithErrors: StoryObj<typeof RegisterPage> = {
  args: {
    ...splitArgs,
    errors: {
      email: 'The email has already been taken.',
      password: 'The password must be at least 8 characters.',
    },
  },
  render: (args) => ({
    components: { RegisterPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <RegisterPage v-bind="args">
        <template #logo><MockLogo /></template>
      </RegisterPage>
    `,
  }),
};

// ===== Forgot Password =====

export const ForgotPassword: StoryObj<typeof ForgotPasswordPage> = {
  args: {
    ...splitArgs,
    loginUrl: '/login',
    logoLink: '/',
  },
  render: (args) => ({
    components: { ForgotPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('Forgot password submitted:', form);
      return { args, handleSubmit };
    },
    template: `
      <ForgotPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo><MockLogo /></template>
      </ForgotPasswordPage>
    `,
  }),
};

export const ForgotPasswordWithStatus: StoryObj<typeof ForgotPasswordPage> = {
  args: {
    ...splitArgs,
    status: 'We have emailed your password reset link!',
    loginUrl: '/login',
  },
  render: (args) => ({
    components: { ForgotPasswordPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <ForgotPasswordPage v-bind="args">
        <template #logo><MockLogo /></template>
      </ForgotPasswordPage>
    `,
  }),
};

// ===== Reset Password =====

export const ResetPassword: StoryObj<typeof ResetPasswordPage> = {
  args: {
    ...splitArgs,
    token: 'abc123def456',
    email: 'user@example.com',
    logoLink: '/',
  },
  render: (args) => ({
    components: { ResetPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('Reset password submitted:', form);
      return { args, handleSubmit };
    },
    template: `
      <ResetPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo><MockLogo /></template>
      </ResetPasswordPage>
    `,
  }),
};

export const ResetPasswordWithErrors: StoryObj<typeof ResetPasswordPage> = {
  args: {
    ...splitArgs,
    token: 'abc123def456',
    email: 'user@example.com',
    errors: {
      password: 'The password must be at least 8 characters.',
      password_confirmation: 'The password confirmation does not match.',
    },
  },
  render: (args) => ({
    components: { ResetPasswordPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <ResetPasswordPage v-bind="args">
        <template #logo><MockLogo /></template>
      </ResetPasswordPage>
    `,
  }),
};

// ===== Confirm Password =====

export const ConfirmPassword: StoryObj<typeof ConfirmPasswordPage> = {
  args: {
    ...splitArgs,
    logoLink: '/',
  },
  render: (args) => ({
    components: { ConfirmPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('Confirm password submitted:', form);
      return { args, handleSubmit };
    },
    template: `
      <ConfirmPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo><MockLogo /></template>
      </ConfirmPasswordPage>
    `,
  }),
};

export const ConfirmPasswordWithErrors: StoryObj<typeof ConfirmPasswordPage> = {
  args: {
    ...splitArgs,
    errors: { password: 'The password is incorrect.' },
  },
  render: (args) => ({
    components: { ConfirmPasswordPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <ConfirmPasswordPage v-bind="args">
        <template #logo><MockLogo /></template>
      </ConfirmPasswordPage>
    `,
  }),
};

// ===== Verify Email =====

export const VerifyEmail: StoryObj<typeof VerifyEmailPage> = {
  args: {
    ...splitArgs,
    logoutUrl: '/logout',
    logoLink: '/',
  },
  render: (args) => ({
    components: { VerifyEmailPage, MockLogo },
    setup() {
      const handleResend = () => console.log('Resend verification email');
      const handleLogout = () => console.log('Logout clicked');
      return { args, handleResend, handleLogout };
    },
    template: `
      <VerifyEmailPage v-bind="args" @resend="handleResend" @logout="handleLogout">
        <template #logo><MockLogo /></template>
      </VerifyEmailPage>
    `,
  }),
};

export const VerifyEmailWithStatus: StoryObj<typeof VerifyEmailPage> = {
  args: {
    ...splitArgs,
    status: 'verification-link-sent',
    logoutUrl: '/logout',
  },
  render: (args) => ({
    components: { VerifyEmailPage, MockLogo },
    setup: () => ({ args }),
    template: `
      <VerifyEmailPage v-bind="args">
        <template #logo><MockLogo /></template>
      </VerifyEmailPage>
    `,
  }),
};

// ===== Two Factor Challenge =====

export const TwoFactorChallenge: StoryObj<typeof TwoFactorChallengePage> = {
  args: {
    ...splitArgs,
    logoLink: '/',
  },
  render: (args) => ({
    components: { TwoFactorChallengePage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => console.log('2FA code submitted:', form);
      const handleRecoverySubmit = (form: any) => console.log('Recovery code submitted:', form);
      return { args, handleSubmit, handleRecoverySubmit };
    },
    template: `
      <TwoFactorChallengePage v-bind="args" @submit="handleSubmit" @submit:recovery="handleRecoverySubmit">
        <template #logo><MockLogo /></template>
      </TwoFactorChallengePage>
    `,
  }),
};

export const TwoFactorWithError: StoryObj<typeof TwoFactorChallengePage> = {
  args: {
    ...splitArgs,
    errors: { code: 'The provided two factor authentication code was invalid.' },
  },
  render: (args) => ({
    components: { TwoFactorChallengePage, MockLogo },
    setup: () => ({ args }),
    template: `
      <TwoFactorChallengePage v-bind="args">
        <template #logo><MockLogo /></template>
      </TwoFactorChallengePage>
    `,
  }),
};
