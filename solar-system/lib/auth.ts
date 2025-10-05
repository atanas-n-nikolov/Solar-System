import { AuthProps } from '@/types/auth';
import { createClient } from './supabase/client';

const supabase = createClient();

export async function signUpUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function authSection(
  pageType: 'signup' | 'signin'
): Promise<AuthProps[]> {
  try {
    const { data, error } = await supabase
      .from('auth_section')
      .select('*')
      .eq('type', pageType);

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error('Unexpected error in auth section:', error);
    return [];
  }
}
