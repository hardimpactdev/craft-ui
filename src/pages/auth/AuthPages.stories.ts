import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import LoginPage from './Login.vue';
import RegisterPage from './Register.vue';
import ForgotPasswordPage from './ForgotPassword.vue';
import ResetPasswordPage from './ResetPassword.vue';
import ConfirmPasswordPage from './ConfirmPassword.vue';
import VerifyEmailPage from './VerifyEmail.vue';
import TwoFactorChallengePage from './TwoFactorChallenge.vue';

// Mock logo component for stories
const MockLogo = {
  template: `
    <svg class="size-full fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l12 6v10l-12-6V18zm28 0v10l-12 6V24l12-6z"/>
    </svg>
  `,
};

// Base meta for auth pages
const baseMeta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

// ===== Login Page =====
const loginMeta: Meta<typeof LoginPage> = {
  ...baseMeta,
  title: 'Pages/Auth/Login',
  component: LoginPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Login page with email/password form, remember me checkbox, and links to register/forgot password.',
      },
    },
  },
};

export default loginMeta;
type LoginStory = StoryObj<typeof loginMeta>;

export const Login: LoginStory = {
  args: {
    canResetPassword: true,
    canRegister: true,
    forgotPasswordUrl: '/forgot-password',
    registerUrl: '/register',
    logoLink: '/',
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('Login submitted:', form);
      };
      return { args, handleSubmit };
    },
    template: `
      <LoginPage v-bind="args" @submit="handleSubmit">
        <template #logo>
          <MockLogo />
        </template>
      </LoginPage>
    `,
  }),
};

export const LoginWithStatus: LoginStory = {
  args: {
    status: 'Password reset link sent successfully!',
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <LoginPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </LoginPage>
    `,
  }),
};

export const LoginWithErrors: LoginStory = {
  args: {
    errors: {
      email: 'These credentials do not match our records.',
    },
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <LoginPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </LoginPage>
    `,
  }),
};

export const LoginProcessing: LoginStory = {
  args: {
    processing: true,
    canResetPassword: true,
    canRegister: true,
  },
  render: (args) => ({
    components: { LoginPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <LoginPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </LoginPage>
    `,
  }),
};

// ===== Register Page =====
const registerMeta: Meta<typeof RegisterPage> = {
  ...baseMeta,
  title: 'Pages/Auth/Register',
  component: RegisterPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Registration page with name, email, password, and password confirmation fields.',
      },
    },
  },
};

export const Register: StoryObj<typeof registerMeta> = {
  args: {
    loginUrl: '/login',
    logoLink: '/',
  },
  render: (args) => ({
    components: { RegisterPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('Register submitted:', form);
      };
      return { args, handleSubmit };
    },
    template: `
      <RegisterPage v-bind="args" @submit="handleSubmit">
        <template #logo>
          <MockLogo />
        </template>
      </RegisterPage>
    `,
  }),
};

export const RegisterWithErrors: StoryObj<typeof registerMeta> = {
  args: {
    errors: {
      email: 'The email has already been taken.',
      password: 'The password must be at least 8 characters.',
    },
  },
  render: (args) => ({
    components: { RegisterPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <RegisterPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </RegisterPage>
    `,
  }),
};

// ===== Forgot Password Page =====
const forgotPasswordMeta: Meta<typeof ForgotPasswordPage> = {
  ...baseMeta,
  title: 'Pages/Auth/ForgotPassword',
  component: ForgotPasswordPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Forgot password page - enter email to receive password reset link.',
      },
    },
  },
};

export const ForgotPassword: StoryObj<typeof forgotPasswordMeta> = {
  args: {
    loginUrl: '/login',
    logoLink: '/',
  },
  render: (args) => ({
    components: { ForgotPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('Forgot password submitted:', form);
      };
      return { args, handleSubmit };
    },
    template: `
      <ForgotPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo>
          <MockLogo />
        </template>
      </ForgotPasswordPage>
    `,
  }),
};

export const ForgotPasswordWithStatus: StoryObj<typeof forgotPasswordMeta> = {
  args: {
    status: 'We have emailed your password reset link!',
    loginUrl: '/login',
  },
  render: (args) => ({
    components: { ForgotPasswordPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <ForgotPasswordPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </ForgotPasswordPage>
    `,
  }),
};

// ===== Reset Password Page =====
const resetPasswordMeta: Meta<typeof ResetPasswordPage> = {
  ...baseMeta,
  title: 'Pages/Auth/ResetPassword',
  component: ResetPasswordPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Reset password page - set new password after clicking email link.',
      },
    },
  },
};

export const ResetPassword: StoryObj<typeof resetPasswordMeta> = {
  args: {
    token: 'abc123def456',
    email: 'user@example.com',
    logoLink: '/',
  },
  render: (args) => ({
    components: { ResetPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('Reset password submitted:', form);
      };
      return { args, handleSubmit };
    },
    template: `
      <ResetPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo>
          <MockLogo />
        </template>
      </ResetPasswordPage>
    `,
  }),
};

// ===== Confirm Password Page =====
const confirmPasswordMeta: Meta<typeof ConfirmPasswordPage> = {
  ...baseMeta,
  title: 'Pages/Auth/ConfirmPassword',
  component: ConfirmPasswordPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Confirm password page - re-enter password for sensitive actions.',
      },
    },
  },
};

export const ConfirmPassword: StoryObj<typeof confirmPasswordMeta> = {
  args: {
    logoLink: '/',
  },
  render: (args) => ({
    components: { ConfirmPasswordPage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('Confirm password submitted:', form);
      };
      return { args, handleSubmit };
    },
    template: `
      <ConfirmPasswordPage v-bind="args" @submit="handleSubmit">
        <template #logo>
          <MockLogo />
        </template>
      </ConfirmPasswordPage>
    `,
  }),
};

// ===== Verify Email Page =====
const verifyEmailMeta: Meta<typeof VerifyEmailPage> = {
  ...baseMeta,
  title: 'Pages/Auth/VerifyEmail',
  component: VerifyEmailPage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Email verification page - prompt user to verify their email address.',
      },
    },
  },
};

export const VerifyEmail: StoryObj<typeof verifyEmailMeta> = {
  args: {
    logoutUrl: '/logout',
    logoLink: '/',
  },
  render: (args) => ({
    components: { VerifyEmailPage, MockLogo },
    setup() {
      const handleResend = () => {
        console.log('Resend verification email');
      };
      const handleLogout = () => {
        console.log('Logout clicked');
      };
      return { args, handleResend, handleLogout };
    },
    template: `
      <VerifyEmailPage v-bind="args" @resend="handleResend" @logout="handleLogout">
        <template #logo>
          <MockLogo />
        </template>
      </VerifyEmailPage>
    `,
  }),
};

export const VerifyEmailWithStatus: StoryObj<typeof verifyEmailMeta> = {
  args: {
    status: 'verification-link-sent',
    logoutUrl: '/logout',
  },
  render: (args) => ({
    components: { VerifyEmailPage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <VerifyEmailPage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </VerifyEmailPage>
    `,
  }),
};

// ===== Two Factor Challenge Page =====
const twoFactorMeta: Meta<typeof TwoFactorChallengePage> = {
  ...baseMeta,
  title: 'Pages/Auth/TwoFactorChallenge',
  component: TwoFactorChallengePage,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Two-factor authentication page with OTP input and recovery code fallback.',
      },
    },
  },
};

export const TwoFactorChallenge: StoryObj<typeof twoFactorMeta> = {
  args: {
    logoLink: '/',
  },
  render: (args) => ({
    components: { TwoFactorChallengePage, MockLogo },
    setup() {
      const handleSubmit = (form: any) => {
        console.log('2FA code submitted:', form);
      };
      const handleRecoverySubmit = (form: any) => {
        console.log('Recovery code submitted:', form);
      };
      return { args, handleSubmit, handleRecoverySubmit };
    },
    template: `
      <TwoFactorChallengePage v-bind="args" @submit="handleSubmit" @submit:recovery="handleRecoverySubmit">
        <template #logo>
          <MockLogo />
        </template>
      </TwoFactorChallengePage>
    `,
  }),
};

export const TwoFactorWithError: StoryObj<typeof twoFactorMeta> = {
  args: {
    errors: {
      code: 'The provided two factor authentication code was invalid.',
    },
  },
  render: (args) => ({
    components: { TwoFactorChallengePage, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <TwoFactorChallengePage v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
      </TwoFactorChallengePage>
    `,
  }),
};
