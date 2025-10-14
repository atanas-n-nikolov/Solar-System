import { NextResponse } from 'next/server';
import { getUserFromJWT } from '@/lib/supabase/server';

export async function GET() {
  const user = await getUserFromJWT();
  if (!user) return NextResponse.json(null, { status: 401 });

  return NextResponse.json(user);
}
