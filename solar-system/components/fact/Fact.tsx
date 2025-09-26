'use client';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Fact as FactType } from '@/types/fact';
import { useLanguage } from '@/context/languageProvider';
import { useTheme } from '@/context/themeProvider';

interface FactsProps {
  fact: FactType | null;
}

export default function Fact({ fact }: FactsProps) {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const translations = { en, bg };
  const t = translations[language];

  if (!fact) return [];

  const title = language === 'bg' ? fact.title_bg : fact.title_en;
  const description =
    language === 'bg' ? fact.description_bg : fact.description_en;

  return (
    <article
      aria-labelledby='fact-heading'
      className='grid max-w-[1216px] mx-auto gap-10 w-full grid-cols-[418px_1fr]'
    >
      <header className='h-[296px] w-[418px] justify-center flex flex-col gap-8 p-10 bg-[#363A51] rounded-[32px]'>
        <svg
          width={40}
          height={40}
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.8169 35.9833C10.3836 35.9833 9.95857 35.85 9.5919 35.5833C8.9419 35.1167 8.62523 34.3333 8.75857 33.5417L10.3252 24.3917L3.68357 17.9167C3.10857 17.3583 2.90857 16.5417 3.15857 15.7833C3.40857 15.025 4.05023 14.4833 4.8419 14.3667L14.0252 13.0333L18.1336 4.71668C18.4836 4.00002 19.2002 3.55835 20.0002 3.55835C20.8002 3.55835 21.5169 4.00002 21.8669 4.71668L25.9752 13.0333L35.1586 14.3667C35.9502 14.4833 36.5919 15.025 36.8419 15.7833C37.0919 16.5417 36.8836 17.3583 36.3169 17.9167L29.6752 24.3917L31.2419 33.5333C31.3752 34.325 31.0586 35.1 30.4086 35.575C29.7586 36.0417 28.9252 36.1 28.2169 35.7333L20.0002 31.4167L11.7836 35.7333C11.4752 35.8917 11.1419 35.975 10.8086 35.975L10.8169 35.9833ZM20.0002 28.6L28.6336 33.1333L26.9836 23.525L33.9669 16.7167L24.3169 15.3167L20.0002 6.57502L15.6836 15.3167L6.03357 16.7167L13.0169 23.525L11.3669 33.1333L20.0002 28.6Z'
            fill='white'
          />
        </svg>
        <h2
          id='fact-heading'
          aria-label='Stellar fact'
          className='font-montserrat text-white text-5xl leading-[54px] font-black tracking-wide'
        >
          {t.fact_title}
        </h2>
        <p className='font-orbitron text-3xl font-black leading-10 tracking-wider bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text text-transparent'>
          {t.fact_when} {fact.year}
        </p>
      </header>
      <aside className='h-[296px] w-[758px] justify-center flex flex-col gap-2 p-10 bg-[#363A51] rounded-[32px]'>
        <h3 className='font-montserrat text-white text-3xl font-black leading-10'>
          {title}
        </h3>
        <p className='text-xl font-light text-[#ffffffcc]'>{description}</p>
      </aside>
    </article>
  );
}
