import { createClient } from './supabase/client';

export default async function getFactOfTheDay() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const supabase = createClient();

  const { data: initialData, error } = await supabase
    .from('facts')
    .select('*')
    .eq('day_of_year', dayOfYear)
    .eq('is_active', true)
    .limit(1);

  if (error) {
    console.error('Supabase error:', error);
  }

  let data = initialData;

  if (!data || data.length === 0) {
    const fallback = await supabase
      .from('facts')
      .select('*')
      .eq('is_active', true)
      .is('day_of_year', null);

    if (fallback.data && fallback.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallback.data.length);
      data = [fallback.data[randomIndex]];
    } else {
      data = [];
    }
  }

  const imageResult = await supabase.from('facts_img').select('*').limit(1);

  const image =
    imageResult.data && imageResult.data.length > 0
      ? imageResult.data[0]
      : null;

  return {
    fact: data.length > 0 ? data[0] : null,
    imageUrl: image?.image_url || null,
  };
}
