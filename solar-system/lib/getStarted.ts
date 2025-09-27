import { createClient } from '@/lib/supabase/client';
import { Started } from '@/types/started';

export async function getStarted(): Promise<Started | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('get_started')
    .select('*')
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }

  return data[0] as Started;
}
