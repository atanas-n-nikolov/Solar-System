import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { hasEnvVars } from '@/lib/utils';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!hasEnvVars) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            });
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.expires_at) {
    return response;
  }

  const now = Math.floor(Date.now() / 1000);

  if (session.expires_at <= now) {
    const { data, error: refreshError } = await supabase.auth.refreshSession();

    if (refreshError || !data.session) {
      console.error('Failed to refresh session:', refreshError?.message);
      response.cookies.delete(
        `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}-auth-token`
      );
      return response;
    }

    const token = JSON.stringify(data.session);
    response.cookies.set({
      name: `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}-auth-token`,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: data.session.expires_in,
    });
  }

  return response;
}
