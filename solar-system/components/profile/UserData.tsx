'use client';
import Image from 'next/image';
import Edit from '../svg/Edit';
import { useTheme } from '@/context/themeProvider';
import { UserProfile } from '@/types/profile';
import { useProfileUI } from '@/context/profileProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';

type UserDataProps = {
  profile: UserProfile;
};
export default function UserData({ profile }: UserDataProps) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const { isPlaying } = useProfileUI();
  const { darkMode } = useTheme();
  const progressPercent = Math.ceil((profile.level / 9) * 100);
  return (
    <header
      className={`flex gap-8 items-center transition-opacity duration-300 ${
        isPlaying ? 'opacity-30 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className={`relative size-[130px] shrink-0 ${
          !profile.avatar ? 'bg-gray-500' : ''
        }`}
      >
        <Image
          src={profile.avatar}
          alt='avatar-image'
          fill
          sizes='130px'
          className='object-cover rounded-full'
          draggable={false}
          priority
        />
        <button
          type='button'
          className='flex justify-center items-center absolute top-0 right-0 size-8 rounded-full border-2 border-white bg-[#0A0909] hover:bg-[#1A1919] transition-colors'
          aria-label='Редактирай аватара'
          onClick={() => console.log('Edit avatar clicked')}
        >
          <Edit className='size-4 text-white' />
        </button>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-4'>
          <h3 className='font-light'>{t.profile.full_name}</h3>
          <span className='font-medium max-w-[109px] truncate'>
            {profile.first_name} {profile.last_name}
          </span>
        </div>
        <div className='flex gap-4'>
          <p className='font-light'>{t.profile.points}</p>
          <span className='font-medium'>{profile.total_points}</span>
        </div>
        <div
          aria-label='Progress'
          className={`profile-ring flex flex-col p-4 gap-0.5 border-none transition-opacity duration-300 ${
            darkMode && 'bg-[#FFFFFF1A]'
          }`}
        >
          <header className='flex gap-0.5 text-xs leading-5 '>
            <p className='font-light flex-1'>
              {Math.round(progressPercent)}% {t.profile.completed}
            </p>
            <p className='font-medium'>{profile.level} / 9</p>
          </header>
          <div className='relative h-2 rounded-[48px] bg-[#F7F9FB] w-full'>
            <span
              className='absolute left-0 top-0 h-full rounded-[32px]'
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #FF5F68 0%, #AE4BCE 100%)',
                transition: 'width 0.3s ease-in-out',
              }}
            ></span>
          </div>
        </div>
      </div>
    </header>
  );
}
