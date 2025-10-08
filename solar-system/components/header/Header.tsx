'use client';
import Link from 'next/link';
import Logo_white from '@/public/logo-white.svg';
import Logo_black from '@/public/logo-black.svg';
import Image from 'next/image';
import NavigationLinks from '@/components/header/NavigationLinks';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/themeProvider';
import { usePathname } from 'next/navigation';
import Arrow from '@/components/svg/Arrow';
import { useAuth } from '@/context/authProvider';

export default function Header() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  const translations = { en, bg };
  const t = translations[language];
  const logo = darkMode ? Logo_white : Logo_black;

  if (pathname === '/signup' || pathname === '/signin') {
    return (
      <header className='w-full max-w-[1216px] mx-auto flex py-6 items-center justify-start relative'>
        <Link href='/'>
          <Image src={logo} alt='logo' width={122} height={40} priority />
        </Link>
      </header>
    );
  }

  return (
    <header className='w-full max-w-[1216px] mx-auto flex py-6 items-center justify-between'>
      <Link href='/'>
        <Image src={logo} alt='logo' width={122} height={40} priority />
      </Link>
      <div className='flex gap-8 items-center list-none font-light'>
        <nav className='flex gap-8'>
          <NavigationLinks t={t} isLoggedIn={isLoggedIn} />
          <LanguageToggle />
        </nav>
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <Link
            href={user ? `/profile/${user.id}` : '/signup'}
            className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
          >
            {user ? user.lastName ?? 'Profile' : t.signup}
            <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}
