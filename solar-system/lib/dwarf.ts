import { Dwarf } from '@/types/dwarf';
import { createClient } from './supabase/client';

export async function getDwarf(): Promise<Dwarf | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('dwarf_planets_section')
    .select('*')
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }

  return data[0] as Dwarf;
}
