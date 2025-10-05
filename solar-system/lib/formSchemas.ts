import { Schema } from './validation';

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repassword: string;
};

export const schemas = {
  signup: {
    firstName: (v) =>
      v.trim().length < 3 ? 'First name must be at least 3 chars' : null,
    lastName: (v) =>
      v.trim().length < 3 ? 'Last name must be at least 3 chars' : null,
    email: (v) => (!v.includes('@') ? 'Invalid email' : null),
    password: (v) =>
      v.length < 6 ? 'Password must be at least 6 chars' : null,
    repassword: (v, data) =>
      v !== data.password ? "Passwords don't match" : null,
  } satisfies Schema<SignupFormData>,

  login: {
    email: (v) => (!v.includes('@') ? 'Invalid email' : null),
    password: (v) =>
      v.length < 6 ? 'Password must be at least 6 chars' : null,
  } satisfies Schema<LoginFormData>,
};
