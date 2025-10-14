import Profile from '@/components/profile/Profile';
import { getUserFromJWT } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const currentUser = await getUserFromJWT();

  if (!currentUser) {
    redirect('/login');
  }

  if (currentUser.id !== resolvedParams.id) {
    redirect(`/profile/${currentUser.id}`);
  }

  return <Profile id={resolvedParams.id} />;
}
