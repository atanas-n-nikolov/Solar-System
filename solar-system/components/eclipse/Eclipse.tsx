'use client';

import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Eclipse as EclipseType } from '@/types/eclipse';
import DateFormat from '@/lib/date';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/themeProvider';
import SunIcon from '@/components/svg/SunIcon';
import CurvedArrow from '@/components/svg/CurvedArrow';

export default function Eclipse({ eclipse }: { eclipse: EclipseType[] }) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const nextEclipse = eclipse[0];
  const { darkMode } = useTheme();

  const labels = [t.days, t.hours, t.minutes, t.seconds];

  const description =
    language === 'bg' ? nextEclipse.description_bg : nextEclipse.description_en;

  const [timeLeft, setTimeLeft] = useState<string[]>(['00', '00', '00', '00']);

  const optimizedUrl =
    'https://res.cloudinary.com/duvx9lwgf/image/upload/f_auto,q_auto/v1755526497/solar-eclipse_vrzwpk.png';

  useEffect(() => {
    setTimeLeft(DateFormat(nextEclipse.date));

    const interval = setInterval(() => {
      setTimeLeft(DateFormat(nextEclipse.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEclipse.date]);

  if (!nextEclipse) return null;

  return (
    <article
      aria-labelledby='next-eclipse-heading'
      className='relative grid max-w-[1216px] mx-auto gap-10 w-full grid-cols-[418px_1fr]'
    >
      <header className='relative h-[600px] rounded-[32px] bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] overflow-hidden'>
        <div
          className='absolute -right-3/4 -bottom-3/4 -translate-y-16 inset-0 bg-fill bg-center opacity-20'
          style={{ backgroundImage: `url(${optimizedUrl})` }}
        ></div>
        <div className='flex flex-col gap-8 p-10 relative z-10'>
          <SunIcon />
          <h2
            id='next-eclipse-heading'
            className='font-montserrat text-white text-5xl leading-[54px] font-black tracking-wide'
          >
            {t.eclipse_title}
          </h2>
          <p className='text-xl font-light text-[#ffffffcc]'>{description}</p>
        </div>
      </header>
      <div className='absolute left-1/4 translate-x-1/4 bottom-5 z-20'>
        <CurvedArrow />
      </div>
      <aside className='grid grid-cols-2 grid-rows-2 gap-10'>
        {timeLeft.map((t, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 items-center justify-center w-[359px] h-[280px] rounded-[24px] p-6 ${
              darkMode ? 'bg-[#FFFFFF1A]' : 'bg-[#F7F9FB]'
            }`}
          >
            <time
              dateTime={t}
              className='font-montserrat text-5xl leading-[54px] font-black tracking-wider'
            >
              {t}
            </time>
            <span className='text-lg leading-[26px] font-light'>
              {labels[i]}
            </span>
          </div>
        ))}
      </aside>
    </article>
  );
}
