import { ApodData } from '@/types/apodData';

export async function getApod(): Promise<ApodData | null> {
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      { signal: controller.signal, next: { revalidate: 86400 } }
    );
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.error) return null;
    return data as ApodData;
  } catch (err) {
    console.error('APOD fetch error:', err);
    return null;
  }
}
