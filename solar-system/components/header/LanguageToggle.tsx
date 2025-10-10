'use client';
import { useAuth } from '@/context/authProvider';
import { useLanguage } from '@/context/languageProvider';
import UpdateLang from '@/lib/auth';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  const isBg = language === 'bg';

  const toggleLanguage = async () => {
    const newLang = isBg ? 'en' : 'bg';
    setLanguage(newLang);

    if (user) {
      try {
        await UpdateLang(user.id, newLang);
      } catch (err) {
        console.error(err);
      }
    }
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
