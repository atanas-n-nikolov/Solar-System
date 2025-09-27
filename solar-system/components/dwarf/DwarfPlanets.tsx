'use client';
import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { Dwarf } from '@/types/dwarf';
import Link from 'next/link';

export default function DwarfPlanets({ dwarf }: { dwarf: Dwarf | null }) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];

  if (!dwarf) return null;

  const title = language === 'en' ? dwarf.title_en : dwarf.title_bg;
  const description =
    language === 'en' ? dwarf.description_en : dwarf.description_bg;

  const highlightWords =
    language === 'en'
      ? ['Pluto', 'Ceres', 'Eris', 'Haumea', 'Makemake']
      : ['Плутон', 'Церера', 'Ерида', 'Хаумеа', 'Макемаке'];

  const renderDescription = (text: string) => {
    const parts = text.split(new RegExp(`(${highlightWords.join('|')})`, 'gi'));
    return parts.map((part, i) =>
      highlightWords.includes(part) ? (
        <span key={i} className='font-bold'>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <article
      aria-labelledby='dwarf-heading'
      className='grid max-w-[1216px] mx-auto gap-10 w-full grid-cols-[418px_1fr]'
    >
      <header className='h-[296px] w-[418px] items-start justify-center flex flex-col gap-8 p-10 bg-[#363A51] rounded-[32px]'>
        <h2 className='font-montserrat text-white text-5xl leading-[54px] font-black tracking-wider'>
          {title}
        </h2>
        <Link
          href='/dwarf'
          className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
        >
          {t.dwarf_link}
          <svg
            width={16}
            height={16}
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.7833 7.41L9.68667 3.31333L8.98 4.02L12.46 7.5H2V8.5H12.46L8.98 11.98L9.68667 12.6867L13.7833 8.59C14.1067 8.26667 14.1067 7.73667 13.7833 7.41Z'
              fill='white'
            />
          </svg>
        </Link>
      </header>
      <aside className='relative h-[296px] w-[758px] justify-center flex flex-col gap-2 p-10 bg-[#42465E] rounded-[32px] overflow-hidden'>
        <div
          className='absolute -bottom-32 inset-0 bg-center bg-no-repeat bg-cover opacity-20'
          style={{ backgroundImage: `url(${dwarf.image_url})` }}
        ></div>
        <h3 className='text-white text-2xl font-light leading-8 relative z-10'>
          {renderDescription(description)}
        </h3>
      </aside>
    </article>
  );
}
