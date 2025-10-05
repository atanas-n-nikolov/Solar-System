'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/lib/auth';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOutUser();
        router.push('/signup');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Logout error:', err.message);
        } else {
          console.error('Logout error:', err);
        }
        router.push('/signup');
      }
    };

    logout();
  }, [router]);

  return <p className='text-center mt-8'>Logging out...</p>;
}
