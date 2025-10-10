import Profile from '@/components/profile/Profile';
import { getLevels } from '@/lib/levels';
import { getUser } from '@/lib/supabase/server';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const profile = await getUser({ id: resolvedParams.id });
  const levels = await getLevels();

  return <Profile profile={profile} levels={levels} />;
}
