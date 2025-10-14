'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOutUser } from '@/lib/auth';
import { useAuth } from '@/context/authProvider';

export default function LogoutPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOutUser();
      } catch (err) {
        console.error('Logout error:', err);
      } finally {
        await refreshUser();
        router.push('/signup');
      }
    };

    logout();
  }, [router, refreshUser]);

  return <p className='text-center mt-8'>Logging out...</p>;
}
