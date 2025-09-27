import { ApodData } from '@/types/apodData';

export async function getApod(): Promise<ApodData | null> {
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const data = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  ).then((res) => res.json());

  if (!data || data.error) return null;

  return data as ApodData;
}
