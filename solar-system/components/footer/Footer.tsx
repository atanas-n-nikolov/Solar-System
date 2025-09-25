'use client';
import { useLanguage } from '@/context/languageProvider';
import { useTheme } from '@/context/themeProvider';
import Link from 'next/link';
import Logo_white from '@/public/logo-white.svg';
import Logo_black from '@/public/logo-black.svg';
import Image from 'next/image';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import NavigationLinks, { NavLink } from '../header/NavigationLinks';

export default function Footer() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const translations = { en, bg };
  const t = translations[language];
  const logo = darkMode ? Logo_white : Logo_black;

  const links: NavLink[] = [
    { href: '/about', label: t.about, auth: 'any' },
    { href: '/terms', label: t.terms, auth: 'any' },
    { href: '/contact', label: t.contact_us, auth: 'any' },
  ];

  return (
    <footer className='w-full max-w-[1216px] mx-auto flex py-6 items-center justify-between'>
      <Link href='/'>
        <Image src={logo} alt='logo' width={122} height={40} priority />
      </Link>
      <div className='flex gap-8 items-center list-none font-light'>
        <nav className='flex gap-8'>
          <NavigationLinks links={links} t={t} />
          <p className='text-[color:var(--muted-text)]'>
            © 2025 Solar System - All Rights Reserved
          </p>
        </nav>
      </div>
    </footer>
  );
}
