'use client';
import Image from 'next/image';
import ArrowNext from '../svg/ArrowNext';
import Checkmark from '../svg/Checkmark';
import ArrowBack from '../svg/ArrowBack';
import { useProfileUI } from '@/context/profileProvider';
import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';

type GuidelineProps = {
  handleQuestion: () => void;
};

export default function Guideline({ handleQuestion }: GuidelineProps) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const { setIsPlaying } = useProfileUI();
  const handleCancel = () => {
    setIsPlaying(false);
  };
  return (
    <header className='w-full max-w-[300px] flex flex-col gap-4 items-center justify-center'>
      <Image
        src='https://res.cloudinary.com/duvx9lwgf/image/upload/v1760333965/rocket_741768_1_x0ie6r.svg'
        alt='test'
        width={60}
        height={60}
      />
      <h3 id='game-action' className='font-montserrat text-2xl font-black'>
        {t.profile.quideline}
      </h3>
      <div className='flex flex-col items-center justify-center gap-2 p-6 rounded-[8px] border border-[#CDD0DB]'>
        <ul className='font-light'>
          <li className='flex gap-2 items-center'>
            <Checkmark className='shrink-0 size-4' />
            {t.profile.quideline_1}
          </li>
          <li className='flex gap-2 items-center'>
            <Checkmark className='shrink-0 size-4' />
            {t.profile.quideline_2}
          </li>
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <button
          onClick={handleCancel}
          className='flex-1 flex items-center justify-center gap-2 py-2 px-6 profile-ring border-none after:rounded-full'
        >
          <ArrowBack /> Cancel
        </button>
        <button
          onClick={handleQuestion}
          className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
        >
          Continue <ArrowNext />
        </button>
      </div>
    </header>
  );
}
