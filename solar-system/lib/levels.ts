import { createClient } from '@/lib/supabase/client';
import { Levels as LevelsProps } from '@/types/levels';

export async function getLevels(): Promise<LevelsProps[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('levels').select('*');

  if (error || !data || data.length === 0) {
    return [];
  }

  return data as LevelsProps[];
}
