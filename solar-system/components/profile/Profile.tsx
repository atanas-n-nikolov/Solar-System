'use client';
import Checked from '../svg/Checked';
import Edit from '../svg/Edit';
import List from '../svg/List';
import SadFace from '../svg/SadFace';
import { useEffect, useRef, useState } from 'react';
import Test from '../svg/Test';
import Arrow from '../svg/Arrow';
import Link from 'next/link';
import { Levels } from '@/types/levels';
import Image from 'next/image';
import { UserProfile } from '@/types/profile';
import { useTheme } from '@/context/themeProvider';

type ProfileProps = {
  profile: UserProfile;
  levels: Levels[];
};

export default function Profile({ profile, levels }: ProfileProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { darkMode } = useTheme();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDown, startX, scrollLeft]);

  const progressPercent = Math.ceil((profile.level / 9) * 100);
  const linePercent = (profile.level - 1) * 132;
  const bgFill = darkMode ? 'white' : '#0A0909';

  if (!levels) return null;

  return (
    <section
      aria-labelledby='profile-section'
      className='grid grid-cols-[379px_1fr] grid-rows-[130px_416px] gap-x-[32px] gap-y-[40px] m-auto w-full max-w-[1216px]'
    >
      <h2 id='profile-section' className='sr-only'>
        User profile and stats
      </h2>

      <header className='flex gap-8 items-center'>
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

          {/* Бутон за редакция */}
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
            <h3 className='font-light'>Fullname:</h3>
            <span className='font-medium'>
              {profile.first_name} {profile.last_name}
            </span>
          </div>
          <div className='flex gap-4'>
            <p className='font-light'>Points:</p>
            <span className='font-medium'>{profile.total_points}</span>
          </div>
          <div
            aria-label='Progress'
            className={`profile-ring flex flex-col p-4 gap-0.5 border-none ${
              darkMode
                ? 'bg-[#FFFFFF1A]'
                : '[background:linear-gradient(180deg,rgba(29,30,39,0.05)_0%,rgba(54,59,82,0.05)_100%)]'
            }`}
          >
            <header className='flex gap-0.5 text-xs leading-5 '>
              <p className='font-light flex-1'>
                {Math.round(progressPercent)}% Completed
              </p>
              <p className='font-medium'>{profile.level} / 9</p>
            </header>
            <div className='relative h-2 rounded-[48px] bg-[#F7F9FB] w-full'>
              <span
                className='absolute left-0 top-0 h-full rounded-[32px]'
                style={{
                  width: `${progressPercent}%`,
                  background:
                    'linear-gradient(90deg, #FF5F68 0%, #AE4BCE 100%)',
                  transition: 'width 0.3s ease-in-out',
                }}
              ></span>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`flex-1 flex items-center gap-10 px-6 border border-[#CDD0DB] rounded-[8px] overflow-hidden ${
          darkMode ? 'bg-[#FFFFFF1A]' : 'bg-white'
        }`}
      >
        <header className='flex flex-col gap-2 w-full max-w-[280px]'>
          <h3 className='font-montserrat text-2xl font-black'>Welcome back!</h3>
          <p className='font-light'>
            Keep playing to collect all the badges. Good luck, explorer!
          </p>
        </header>

        <div
          ref={scrollRef}
          className='scrollbar-hide relative flex items-center overflow-x-auto gap-8 scrollbar-hide py-4 cursor-grab active:cursor-grabbing select-none'
          onMouseDown={handleMouseDown}
        >
          <div
            className='absolute top-1/2 left-[100px] h-[2px] -translate-y-1/2 z-0'
            style={{
              width: '956px',
              backgroundImage:
                'repeating-linear-gradient(to right, #D1D5DB 0 4px, transparent 4px 8px)',
            }}
          ></div>
          <div
            className='absolute top-1/2 left-[100px] h-[2px] bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] -translate-y-1/2 z-0'
            style={{
              width: `${linePercent}px`,
            }}
          ></div>

          {levels.map((l, index) => {
            const isValid = l.level <= profile.level;
            const nextLevel = profile.level + 1;
            return (
              <div
                key={index}
                className={`flex items-center justify-center  text-lg font-medium rounded-[8px] shrink-0 w-[100px] h-[100px] z-10 ${
                  isValid
                    ? 'border-none profile-ring'
                    : 'border border-gray-300'
                } ${darkMode ? 'bg-[#484950]' : 'bg-white'}`}
              >
                <img
                  src={l.image_url}
                  alt={l.level.toString()}
                  className={`h-[80px] w-auto object-contain select-none ${
                    !isValid ? 'opacity-30 filter grayscale' : ''
                  }`}
                  draggable={false}
                />
                {l.level === nextLevel && (
                  <Link
                    href='/'
                    className='absolute font-normal w-[76px] text-center py-1 px-4 rounded-full text-sm leading-[22px] text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
                    draggable={false}
                  >
                    Start
                  </Link>
                )}
                {l.level > nextLevel && (
                  <div className='absolute font-normal w-[76px] text-center py-1 px-4 rounded-full text-sm leading-[22px] text-white bg-[#0A0909]'>
                    Level {l.level}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <section aria-labelledby='user-stats' className='flex flex-col gap-4'>
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
            <h4 className='font-light'>Total questions answered</h4>
            <p className='font-medium text-2xl leading-6'>
              {profile.answered_questions}
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
            <Checked bgFill={bgFill} />
          </div>
          <header
            className={`flex flex-col gap-2 ${
              darkMode ? 'text-white' : 'text-[#0A0909]'
            }`}
          >
            <h4 className='font-light'>Correct answers</h4>
            <p className='font-medium text-2xl leading-6'>
              {profile.correct_answers}{' '}
              <span>
                |{' '}
                {profile.answered_questions > 0
                  ? `${(
                      (profile.correct_answers / profile.answered_questions) *
                      100
                    ).toFixed(1)}%`
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
            <h4 className='font-light'>Wrong answers</h4>
            <p className='font-medium text-2xl leading-6'>
              {profile.wrong_answers}{' '}
              <span>
                |{' '}
                {profile.answered_questions > 0
                  ? `${(
                      (profile.wrong_answers / profile.answered_questions) *
                      100
                    ).toFixed(1)}%`
                  : '0%'}
              </span>
            </p>
          </header>
        </article>
      </section>

      <aside
        aria-labelledby='game-action'
        className={`flex flex-col justify-center items-center row-span-1 gap-6 px-6 border border-[#CDD0DB] rounded-[8px] self-stretch ${
          darkMode ? 'bg-[#FFFFFF1A]' : ''
        }`}
      >
        <header className='max-w-[280px] flex flex-col gap-2 items-center justify-center text-center'>
          <div className='grayscale hover:grayscale-0 transition'>
            <Test />
          </div>
          <h3 id='game-action' className='font-montserrat text-2xl font-black'>
            Level 3
          </h3>
          <p className='font-light'>
            Keep playing to collect all the badges. Good luck, explorer!
          </p>
        </header>
        <Link
          href='/'
          className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
        >
          Start game <Arrow />
        </Link>
      </aside>
    </section>
  );
}
