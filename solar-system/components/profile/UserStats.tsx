'use client';
import { useTheme } from '@/context/themeProvider';
import Checked from '@/components/svg/Checked';
import List from '@/components/svg/List';
import SadFace from '@/components/svg/SadFace';
import { useProfileUI } from '@/context/profileProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';

type UserStats = {
  correctAnswers: number;
  answeredQuestions: number;
  wrongAnswers: number;
};

export default function UserStats({
  correctAnswers,
  answeredQuestions,
  wrongAnswers,
}: UserStats) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const { darkMode } = useTheme();
  const { isPlaying } = useProfileUI();
  const bgFill = darkMode ? 'white' : '#0A0909';
  return (
    <section
      aria-labelledby='user-stats'
      className={`flex flex-col gap-4 transition-opacity duration-300 ${
        isPlaying ? 'opacity-30 pointer-events-none' : 'opacity-100'
      }`}
    >
      <h3 id='user-stats' className='sr-only'>
        User statistics
      </h3>

      <article
        className={`flex items-center gap-4 p-8 rounded-[8px] ${
          darkMode ? 'bg-[#FFFFFF1A]' : 'bg-[#F7F9FB]'
        }`}
      >
        <div
          className={`flex items-center justify-center flex-1 size-16 max-w-16 rounded-full ${
            darkMode
              ? 'bg-[#FFFFFF1A]'
              : '[background:linear-gradient(180deg,rgba(29,30,39,0.05)_0%,rgba(54,59,82,0.05)_100%)]'
          }`}
        >
          <List bgFill={bgFill} />
        </div>
        <header
          className={`flex flex-col gap-2 ${
            darkMode ? 'text-white' : 'text-[#0A0909]'
          }`}
        >
          <h4 className='font-light'>{t.profile.total_questions_answered}</h4>
          <p className='font-medium text-2xl leading-6'>{answeredQuestions}</p>
        </header>
      </article>

      <article
        className={`flex items-center gap-4 p-8 rounded-[8px] ${
          darkMode ? 'bg-[#FFFFFF1A]' : 'bg-[#F7F9FB]'
        }`}
      >
        <div
          className={`flex items-center justify-center flex-1 size-16 max-w-16 rounded-full ${
            darkMode
              ? 'bg-[#FFFFFF1A]'
              : '[background:linear-gradient(180deg,rgba(29,30,39,0.05)_0%,rgba(54,59,82,0.05)_100%)]'
          }`}
        >
          <Checked bgFill={bgFill} />
        </div>
        <header
          className={`flex flex-col gap-2 ${
            darkMode ? 'text-white' : 'text-[#0A0909]'
          }`}
        >
          <h4 className='font-light'>{t.profile.correct_answers}</h4>
          <p className='font-medium text-2xl leading-6'>
            {correctAnswers}{' '}
            <span>
              |{' '}
              {answeredQuestions > 0
                ? `${((correctAnswers / answeredQuestions) * 100).toFixed(1)}%`
                : '0%'}
            </span>
          </p>
        </header>
      </article>

      <article
        className={`flex items-center gap-4 p-8 rounded-[8px] ${
          darkMode ? 'bg-[#FFFFFF1A]' : 'bg-[#F7F9FB]'
        }`}
      >
        <div
          className={`flex items-center justify-center flex-1 size-16 max-w-16 rounded-full ${
            darkMode
              ? 'bg-[#FFFFFF1A]'
              : '[background:linear-gradient(180deg,rgba(29,30,39,0.05)_0%,rgba(54,59,82,0.05)_100%)]'
          }`}
        >
          <SadFace bgFill={bgFill} />
        </div>
        <header
          className={`flex flex-col gap-2 ${
            darkMode ? 'text-white' : 'text-[#0A0909]'
          }`}
        >
          <h4 className='font-light'>{t.profile.wrong_answers}</h4>
          <p className='font-medium text-2xl leading-6'>
            {wrongAnswers}{' '}
            <span>
              |{' '}
              {answeredQuestions > 0
                ? `${((wrongAnswers / answeredQuestions) * 100).toFixed(1)}%`
                : '0%'}
            </span>
          </p>
        </header>
      </article>
    </section>
  );
}
