import Signup from '@/components/auth/signup/Signup';
import { authSection } from '@/lib/auth';
import { getUserFromJWT } from '@/lib/supabase/server';
import { AuthProps } from '@/types/auth';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getUserFromJWT();

  if (user) {
    redirect('/');
  }

  const section: AuthProps[] = await authSection('signup');

  return <Signup section={section} />;
}
