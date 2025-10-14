'use client';
import { Levels } from '@/types/levels';
import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import ArrowStart from '@/components/svg/ArrowStart';

type IntroProps = {
  nextLevel?: Levels;
  handleChange: () => void;
};

export default function Intro({ nextLevel, handleChange }: IntroProps) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  return (
    <>
      <header className='max-w-[280px] flex flex-col gap-2 items-center justify-center text-center'>
        <div className='flex items-center justify-center  text-lg font-medium rounded-[8px] shrink-0 w-[100px] h-[100px] z-10 grayscale hover:grayscale-0 transition'>
          <img
            src={nextLevel ? nextLevel.image_url : ''}
            alt={nextLevel ? nextLevel.level.toString() : ''}
            className='h-[80px] w-auto object-contain select-none'
            draggable={false}
          />
        </div>
        <h3 id='game-action' className='font-montserrat text-2xl font-black'>
          {t.profile.level} {nextLevel ? nextLevel.level : ''}
        </h3>
        <p className='font-light'>{t.profile.welcome_msg}</p>
      </header>
      <button
        onClick={handleChange}
        className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
      >
        {t.profile.start_game} <ArrowStart />
      </button>
    </>
  );
}
