'use client';
import { useState } from 'react';
import type { Planet } from '@/types/planet';
import Image from 'next/image';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import Link from 'next/link';
import { useTheme } from '@/context/themeProvider';

export default function PlanetsCarousel({ planets }: { planets: Planet[] }) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const translations = { en, bg };
  const t = translations[language];
  const [activeIndex, setActiveIndex] = useState(
    planets.findIndex((p) => p.order === 3)
  );
  const [showDetail, setShowDetail] = useState(false);

  const total = planets.length;

  const getPositionIndex = (i: number) => {
    const diff = (i - activeIndex + total) % total;
    if (diff === 0) return 1;
    if (diff === 1) return 2;
    if (diff === 2) return 3;
    if (diff === 3) return 4;
    return 0;
  };

  const nextPlanet = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setShowDetail(false);
  };

  const prevPlanet = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setShowDetail(false);
  };

  return (
    <section
      className='relative min-h-[912px] overflow-hidden select-none'
      aria-label='Solar system planets carousel'
    >
      <div className='relative w-full max-w-[1216px] h-full min-h-[912px] mx-auto'>
        <h1 className='absolute font-light top-[201px] tracking-wider uppercase bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text text-transparent'>
          Explore the solar system
        </h1>
        {planets.map((planet, idx) => {
          const lowRes = planet.image_url.replace(
            '/upload/',
            '/upload/w_200,q_auto,f_auto/'
          );
          const highRes = planet.image_url.replace(
            '/upload/',
            '/upload/w_600,q_auto,f_auto/'
          );
          const posIndex = getPositionIndex(idx);
          const name = language === 'bg' ? planet.name_bg : planet.name_en;
          const fact = language === 'bg' ? planet.fact_bg : planet.fact_en;
          const planetTitle = t.planet_fact_title;

          return (
            <article
              key={planet.id}
              className={`absolute left-0 w-1/2 h-full item pos-${posIndex}`}
              aria-hidden={posIndex !== 1}
            >
              <Image
                src={posIndex === 1 ? highRes : lowRes}
                alt={name}
                width={500}
                height={500}
                draggable={false}
                priority={posIndex === 1}
                loading={posIndex === 1 ? 'eager' : 'lazy'}
                className='h-[500px] w-auto absolute bottom-1/2 translate-y-1/2 -right-3/4'
              />
              {!showDetail && posIndex === 1 && (
                <div className='w-[360px] flex flex-col absolute top-[241px] gap-4'>
                  <h2
                    className={`font-montserrat text-7xl leading-[80px] tracking-wide opacity-0 font-black ${
                      posIndex === 1 && !showDetail ? 'animate-showContent' : ''
                    }`}
                    style={{ animationDelay: '0.6s' }}
                  >
                    {name}
                  </h2>
                  <p
                    className={`opacity-0 leading-[26px] font-light ${
                      posIndex === 1 && !showDetail ? 'animate-showContent' : ''
                    }`}
                    style={{ animationDelay: '0.8s' }}
                  >
                    {planetTitle} {fact}
                  </p>

                  {/* <Link
                    href='/planets'
                    aria-label={`See more about ${name}`}
                    className={`uppercase mt-4 inline-block font-semibold border-b border-gray-600 opacity-0 ${
                      posIndex === 1 && !showDetail ? 'animate-showContent' : ''
                    } ${
                      darkMode
                        ? 'hover:text-[#f4d03f] hover:border-[#f4d03f]'
                        : 'hover:text-[#ff6817] hover:border-[#ff6817]'
                    }`}
                    style={{ animationDelay: '1s' }}
                  >
                    See More &#8599;
                  </Link> */}
                </div>
              )}
            </article>
          );
        })}
        <div className='absolute left-0 top-1/2 -translate-y-full flex gap-4 justify-between z-50'>
          <button
            onClick={prevPlanet}
            aria-label='Previous planet'
            className='w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-lg'
          >
            ‹
          </button>
          <button
            onClick={nextPlanet}
            aria-label='Next planet'
            className='w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-lg'
          >
            ›
          </button>
        </div>
        <div className='flex items-center gap-2 absolute top-[591px] text-sm leading-[22px] font-light'>
          <div className='relative size-4'>
            <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] size-[6px]'></div>
            <div
              className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] size-[12px] animate-pulse-radio'
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full absolute bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] size-[16px] animate-pulse-radio2'
              style={{ animationDelay: '0.45s' }}
            ></div>
          </div>
          <p>Players who dared the quiz today:</p>
          <span className='font-medium'>1645</span>
          <Link
            href='/signup'
            aria-label='Sign up'
            className="relative z-10 text-transparent bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text
             after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-full after:h-px
             after:bg-gradient-to-r after:from-[#FF5F68] after:to-[#AE4BCE]"
          >
            {t.signup}
          </Link>
        </div>
      </div>
    </section>
  );
}
