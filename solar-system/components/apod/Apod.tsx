'use client';
import { useTheme } from '@/context/themeProvider';
import { ApodData } from '@/types/apodData';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import NasaLogo from '../svg/NasaLogo';
import Calendar from '../svg/Calendar';
import Image from 'next/image';

export default function Apod({ apod }: { apod: ApodData | null }) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();

  const formatDate = (dateString: string, language: 'en' | 'bg') => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const translations = { en, bg };
  const t = translations[language];

  if (!apod) {
    return null;
  }

  return (
    <article className='grid py-[120px] max-w-[1216px] mx-auto gap-10 w-full grid-cols-[600px_1fr]'>
      <aside className='relative overflow-hidden min-h-[50px] h-full'>
        {apod.media_type === 'image' ? (
          <Image
            src={apod.hdurl || apod.url}
            alt={apod.title}
            fill
            style={{ objectFit: 'cover', borderRadius: '1.5rem' }}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
          />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            className='w-full h-full rounded-3xl'
            allowFullScreen
          />
        )}
        <NasaLogo className='absolute right-6 bottom-6' />
      </aside>
      <header className='flex flex-col items-left justify-center gap-4 min-h-[50px] h-full'>
        <h2 className='font-montserrat text-5xl leading-[54px] font-black tracking-wide'>
          {t.apod_title}
        </h2>
        <h3 className='flex flex-col gap-2'>
          <span className='flex items-center gap-2 font-light'>
            <Calendar />
            <time
              className={`text-lg leading-[26px] font-light ${
                darkMode ? 'text-[#FFFFFFCC]' : ''
              }`}
              dateTime={apod.date}
            >
              {formatDate(apod.date, language)}
            </time>
          </span>
          <span className='font-montserrat text-3xl leading-10 font-black tracking-wide'>
            {apod.title}
          </span>
        </h3>
        <div className='relative flex-1 overflow-hidden'>
          <div className='overflow-y-auto h-full pr-2'>
            <p
              className={`text-lg font-light ${
                darkMode ? 'text-[#FFFFFFCC]' : ''
              }`}
            >
              {apod.explanation}
            </p>
          </div>
        </div>
      </header>
    </article>
  );
}
