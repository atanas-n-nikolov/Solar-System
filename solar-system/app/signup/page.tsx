import Signup from '@/components/auth/signup/Signup';
import { authSection } from '@/lib/auth';
import { AuthProps } from '@/types/auth';

export default async function SignupPage() {
  const section: AuthProps[] = await authSection('signup');
  return <Signup section={section} />;
}
