import { Eclipse } from '@/types/eclipse';
import { createClient } from './supabase/client';

export async function getEclipse(): Promise<Eclipse[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('solar_eclipses')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(1);

  if (error || !data) {
    return [];
  }

  return data as Eclipse[];
}
