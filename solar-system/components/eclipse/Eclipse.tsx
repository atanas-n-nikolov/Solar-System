'use client';

import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Eclipse as EclipseType } from '@/types/eclipse';
import DateFormat from '@/lib/date';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/themeProvider';

export default function Eclipse({ eclipse }: { eclipse: EclipseType[] }) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const nextEclipse = eclipse[0];
  const { darkMode } = useTheme();

  if (!nextEclipse) return null;

  const labels = [t.days, t.hours, t.minutes, t.seconds];

  const description =
    language === 'bg' ? nextEclipse.description_bg : nextEclipse.description_en;

  const [timeLeft, setTimeLeft] = useState<string[]>(['00', '00', '00', '00']);

  useEffect(() => {
    setTimeLeft(DateFormat(nextEclipse.date));

    const interval = setInterval(() => {
      setTimeLeft(DateFormat(nextEclipse.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEclipse.date]);

  return (
    <article
      aria-labelledby='next-eclipse-heading'
      className='relative grid max-w-[1216px] mx-auto gap-10 w-full grid-cols-[418px_1fr]'
    >
      <header className='relative h-[600px] rounded-[32px] bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] overflow-hidden'>
        <div
          className="absolute -right-3/4 -bottom-3/4 -translate-y-16 inset-0 bg-[url('https://res.cloudinary.com/duvx9lwgf/image/upload/v1755526497/solar-eclipse_vrzwpk.png')] 
               bg-fill bg-center opacity-20"
        ></div>
        <div className='flex flex-col gap-8 p-10 relative z-10'>
          <svg
            width={40}
            height={40}
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21.2503 1.66663H18.7503V6.66663H21.2503V1.66663Z'
              fill='white'
            />
            <path
              d='M38.3337 18.75H33.3337V21.25H38.3337V18.75Z'
              fill='white'
            />
            <path
              d='M6.66699 18.75H1.66699V21.25H6.66699V18.75Z'
              fill='white'
            />
            <path
              d='M32.0768 6.15423L28.5413 9.68977L30.309 11.4575L33.8446 7.922L32.0768 6.15423Z'
              fill='white'
            />
            <path
              d='M7.91741 6.14242L6.14965 7.91018L9.68518 11.4457L11.4529 9.67795L7.91741 6.14242Z'
              fill='white'
            />
            <path
              d='M9.68515 28.5542L6.14961 32.0897L7.91738 33.8575L11.4529 30.3219L9.68515 28.5542Z'
              fill='white'
            />
            <path
              d='M20.0003 30.8333C14.0253 30.8333 9.16699 25.975 9.16699 20C9.16699 14.025 14.0253 9.16663 20.0003 9.16663C25.9753 9.16663 30.8337 14.025 30.8337 20C30.8337 25.975 25.9753 30.8333 20.0003 30.8333ZM20.0003 11.6666C15.4087 11.6666 11.667 15.4083 11.667 20C11.667 24.5916 15.4087 28.3333 20.0003 28.3333C24.592 28.3333 28.3337 24.5916 28.3337 20C28.3337 15.4083 24.592 11.6666 20.0003 11.6666Z'
              fill='white'
            />
            <path
              d='M21.2503 33.3333H18.7503V38.3333H21.2503V33.3333Z'
              fill='white'
            />
            <path
              d='M30.309 28.5424L28.5412 30.3102L32.0768 33.8457L33.8445 32.0779L30.309 28.5424Z'
              fill='white'
            />
          </svg>
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
        <svg
          width={182}
          height={166}
          viewBox='0 0 182 166'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M162.013 72.5706C163.661 83.6163 159.546 93.9276 161.059 104.583C161.095 104.834 161.798 105.009 162.88 105.552C163.658 103.72 164.805 102.019 165.12 100.165C166.581 91.637 168.168 83.1162 169.016 74.5129C169.83 66.366 166.564 63.6928 158.429 65.0194C151.001 66.2293 143.615 67.5945 136.216 68.9526C135.424 69.1024 134.715 69.6775 132.792 70.6193C141.7 74.7774 149.815 70.8132 158.864 71.7702C153.613 77.4538 149.262 82.6883 144.371 87.3491C127.849 103.118 108.928 114.483 85.8609 117.594C55.3915 121.701 28.6481 107.442 14.816 79.974C14.72 79.7708 14.631 79.5553 14.5084 79.3697C13.2793 77.4619 12.923 73.5305 9.55224 75.4742C6.52439 77.222 9.06687 79.9537 10.126 82.0423C26.9817 115.047 60.2611 130.01 96.1612 120.62C119.226 114.585 137.657 101.281 153.121 83.5376C156.218 79.9918 159.036 76.2191 161.988 72.5564L162.013 72.5706Z'
            fill='url(#paint0_linear_4349_2041)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_4349_2041'
              x1={154.718}
              y1={119.688}
              x2={26.2931}
              y2={45.5415}
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#FF5F68' />
              <stop offset={1} stopColor='#AE4BCE' />
            </linearGradient>
          </defs>
        </svg>
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
