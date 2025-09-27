import { Planet } from '@/types/planet';
import { createClient } from '@/lib/supabase/client';

export async function getPlanets(): Promise<Planet[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('planets')
    .select('*')
    .order('order', { ascending: true })
    .limit(9);

  if (error || !data) {
    return [];
  }

  return data as Planet[];
}
