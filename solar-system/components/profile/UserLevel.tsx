'use client';
import { useLanguage } from '@/context/languageProvider';
import { useProfileUI } from '@/context/profileProvider';
import { useTheme } from '@/context/themeProvider';
import { Levels } from '@/types/levels';
import { useEffect, useRef, useState } from 'react';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';

type UserLevelProps = {
  level: number;
  levels: Levels[];
};

export default function UserLevel({ level, levels }: UserLevelProps) {
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isPlaying, setIsPlaying } = useProfileUI();
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { darkMode } = useTheme();
  const handleChange = () => {
    setIsPlaying(true);
  };
  const linePercent = 32;
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

  const linePositions = [100, 232, 364, 496, 628, 760, 892, 1024];

  return (
    <aside
      className={`flex-1 flex items-center gap-10 px-6 border border-[#CDD0DB] rounded-[8px] overflow-hidden ${
        darkMode ? 'bg-[#FFFFFF1A]' : 'bg-white'
      } transition-opacity duration-300 ${
        isPlaying ? 'opacity-30 pointer-events-none' : 'opacity-100'
      }`}
    >
      <header className='flex flex-col gap-2 w-full max-w-[280px]'>
        <h3 className='font-montserrat text-2xl font-black'>
          {t.profile.welcome_back}
        </h3>
        <p className='font-light'>{t.profile.welcome_msg}</p>
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
        {linePositions.map((pos, index) =>
          level > index + 1 ? (
            <div
              key={pos}
              className='absolute top-1/2 h-[2px] bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] -translate-y-1/2 z-0'
              style={{
                left: `${pos}px`,
                width: `${linePercent}px`,
              }}
            ></div>
          ) : null
        )}
        {levels.map((l, index) => {
          const isValid = l.level <= level;
          const nextLevel = level + 1;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-center  text-lg font-medium rounded-[8px] shrink-0 w-[100px] h-[100px] z-10 transition-opacity duration-300 ${
                isValid ? 'border-none profile-ring' : 'border border-gray-300'
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
                <button
                  onClick={handleChange}
                  className='absolute font-normal text-center py-1 px-4 rounded-full text-sm leading-[22px] text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
                  draggable={false}
                >
                  {t.profile.start}
                </button>
              )}
              {l.level > nextLevel && (
                <div className='absolute font-normal flex-1 text-center py-1 px-4 rounded-full text-sm leading-[22px] text-white bg-[#0A0909]'>
                  {t.profile.level} {l.level}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
