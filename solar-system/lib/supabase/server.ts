import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserFromJWT() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Error fetching user profile:', error?.message);
    return null;
  }

  return {
    id: profile.id,
    firstName: profile.first_name,
    preferred_lang: profile.preferred_lang,
    preferred_theme: profile.preferred_theme,
  };
}

export async function getUser({ id }: { id: string }) {
  const supabase = await createServerSupabaseClient();
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return profile;
}
