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

export async function getProfile(id: string) {
  const isUser = await getUser();
  if (isUser && isUser.id === id) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Грешка при извличане на профила:', error);
      return null;
    }
  } else {
    console.warn('Невалиден достъп: потребителят не съвпада с id');
    return null;
  }
}

const getUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};

export default async function UpdateLang(userId: string, lang: 'en' | 'bg') {
  const { data, error } = await supabase
    .from('users')
    .update({ preferred_lang: lang })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating language:', error.message);
    return null;
  }

  return data;
}
