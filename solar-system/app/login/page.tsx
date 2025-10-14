import Signin from '@/components/auth/signin/Signin';
import { authSection } from '@/lib/auth';
import { getUserFromJWT } from '@/lib/supabase/server';
import { AuthProps } from '@/types/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getUserFromJWT();

  if (user) {
    redirect('/');
  }

  const section: AuthProps[] = await authSection('signin');
  return <Signin section={section} />;
}
