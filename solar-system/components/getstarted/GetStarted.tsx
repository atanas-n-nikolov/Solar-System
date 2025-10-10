'use client';
import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Started } from '@/types/started';
import Link from 'next/link';
import { useTheme } from '@/context/themeProvider';
import Arrow from '@/components/svg/Arrow';
import Image from 'next/image';

export default function GetStarted({ started }: { started: Started | null }) {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const translations = { en, bg };
  const t = translations[language];
  if (!started) return null;
  const title = language === 'en' ? started.title_en : started.title_bg;
  const description =
    language === 'en' ? started.description_en : started.description_bg;
  const cardProfile = darkMode
    ? started.image_url_dark
    : started.image_url_light;
  const cardGame = darkMode
    ? started.image_url_2_dark
    : started.image_url_2_light;

  return (
    <article className='grid gap-[120px] w-full max-w-[1216px] mx-auto py-[180px] grid-cols-[636px_1fr]'>
      <div className='flex flex-col justify-center items-start gap-8'>
        <header className='flex flex-col gap-2'>
          <h2 className='font-montserrat text-5xl leading-[54px] font-black tracking-wider'>
            {title}
          </h2>
          <p
            className={`text-xl font-light ${
              darkMode ? 'text-[#FFFFFFCC]' : ''
            }`}
          >
            {description}
          </p>
        </header>
        <Link
          href='/signup'
          className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
        >
          {t.signup}
          <Arrow />
        </Link>
      </div>
      <aside className='h-[510px] relative'>
        <Link href='/signup'>
          <Image
            src={cardProfile}
            alt='card profile'
            width={289}
            height={316}
            className='absolute left-0 top-0 object-cover rounded-3xl shadow-[0px_2px_21px_0px_#7680A126] transition hover:scale-105'
          />
        </Link>
        <Link href='/signup'>
          <Image
            src={cardGame}
            alt='game profile'
            width={289}
            height={316}
            className='absolute bottom-0 right-0 object-cover rounded-3xl shadow-[0px_2px_21px_0px_#7680A126] transition hover:scale-105'
          />
        </Link>
      </aside>
    </article>
  );
}
