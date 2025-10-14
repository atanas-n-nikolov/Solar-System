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
import { useAuth } from '@/context/authProvider';
import UserIcon from '@/components/svg/UserIcon';
import ArrowNext from '@/components/svg/ArrowNext';

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
        <div className='flex gap-4 items-center relative'>
          <ThemeToggle />

          {user ? (
            <div className='relative group'>
              <Link
                href={`/profile/${user.id}`}
                className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
              >
                {user.firstName ?? 'Profile'}
                <UserIcon width={16} height={16} bgFill='white' />
              </Link>

              <ul className='absolute py-4 left-0 w-40 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50 pointer-events-auto'>
                <li className='p-2'>
                  <Link
                    href='/score'
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800'
                  >
                    Leaderboard
                  </Link>
                </li>
                <li className='p-2'>
                  <Link
                    href='/logout'
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800'
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href='/signup'
              className='flex items-center gap-2 py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
            >
              {t.signup}
              <ArrowNext />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
