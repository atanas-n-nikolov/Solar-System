'use client';
import Link from 'next/link';
import Logo_white from '@/public/logo-white.svg';
import Logo_black from '@/public/logo-black.svg';
import Image from 'next/image';
import NavigationLinks, { NavLink } from '@/components/header/NavigationLinks';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/themeProvider';

export default function Header() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const translations = { en, bg };
  const t = translations[language];
  const logo = darkMode ? Logo_white : Logo_black;

  const links: NavLink[] = [
    { href: '/', label: t.home, auth: 'any' },
    { href: '/planets', label: t.planets, auth: 'any' },
    { href: '/contact', label: t.contact_us, auth: 'any' },
  ];

  return (
    <header className='w-full max-w-[1216px] mx-auto flex py-6 items-center justify-between'>
      <Link href='/'>
        <Image src={logo} alt='logo' width={122} height={40} priority />
      </Link>
      <div className='flex gap-8 items-center list-none font-light'>
        <nav className='flex gap-8'>
          <NavigationLinks links={links} t={t} />
          <LanguageToggle />
        </nav>
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <Link
            href='/signup'
            className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
          >
            {t.signup}
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
        </div>
      </div>
    </header>
  );
}
