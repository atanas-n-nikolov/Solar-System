'use client';
import { useLanguage } from '@/context/languageProvider';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const isBg = language === 'bg';

  const toggleLanguage = () => {
    setLanguage(isBg ? 'en' : 'bg');
  };

  return (
    <div className='relative flex items-center'>
      <input
        type='checkbox'
        id='lang-toggle'
        checked={isBg}
        onChange={toggleLanguage}
        className='hidden'
      />
      <label
        htmlFor='lang-toggle'
        className='cursor-pointer flex items-center gap-2'
      >
        <span className='text-[color:var(--muted-text)]'>
          {isBg ? 'БГ' : 'EN'}
        </span>
      </label>
    </div>
  );
}
