import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  await supabase.auth.signOut();

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}-auth-token`,
    value: '',
    path: '/',
    maxAge: 0,
  });

  return response;
}
