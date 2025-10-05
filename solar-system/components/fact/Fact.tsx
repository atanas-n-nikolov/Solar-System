'use client';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Fact as FactType } from '@/types/fact';
import { useLanguage } from '@/context/languageProvider';
import StarIcon from '@/components/svg/StarIcon';

interface FactsProps {
  fact: FactType | null;
}

export default function Fact({ fact }: FactsProps) {
  const { language } = useLanguage();

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
      <header className='min-h-[296px] h-full w-[418px] justify-center flex flex-col gap-8 p-10 bg-[#363A51] rounded-[32px]'>
        <StarIcon />
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
      <aside className='min-h-[296px] h-full w-[758px] justify-center flex flex-col gap-2 p-10 bg-[#363A51] rounded-[32px]'>
        <h3 className='font-montserrat text-white text-3xl font-black leading-10'>
          {title}
        </h3>
        <p className='text-xl font-light text-[#ffffffcc]'>{description}</p>
      </aside>
    </article>
  );
}
