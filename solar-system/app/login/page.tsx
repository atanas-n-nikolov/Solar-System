import Signin from '@/components/auth/signin/Signin';
import { authSection } from '@/lib/auth';
import { AuthProps } from '@/types/auth';

export default async function LoginPage() {
  const section: AuthProps[] = await authSection('signin');
  return <Signin section={section} />;
}
