// Login
export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

// Register
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

// Forgot Password
export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordErrors {
  email?: string;
}

// Reset Password
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

// Confirm Password
export interface ConfirmPasswordForm {
  password: string;
}

export interface ConfirmPasswordErrors {
  password?: string;
}

// Two Factor
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

// Layout variant
export type AuthLayoutVariant = 'simple' | 'split';
