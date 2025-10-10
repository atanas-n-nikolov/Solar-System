import type { Metadata } from 'next';
import { Roboto, Montserrat, Orbitron } from 'next/font/google';
import bgJson from '@/locales/bg.json';
import enJson from '@/locales/en.json';
import type { Translation } from '@/types/i18n';
import { cookies } from 'next/headers';
import { LanguageProvider } from '@/context/languageProvider';
import { ThemeProvider } from '@/context/themeProvider';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { getUserFromJWT } from '@/lib/supabase/server';
import { AuthProvider } from '@/context/authProvider';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
});

const bgDict: Translation = bgJson as Translation;
const enDict: Translation = enJson as Translation;

export async function generateMetadata({
  params,
}: {
  params: { lang?: 'bg' | 'en' };
}): Promise<Metadata> {
  const lang = params.lang || 'en';
  const dict = lang === 'bg' ? bgDict : enDict;

  return {
    title: dict.title,
    description: dict.description,
    keywords: dict.keywords,
    authors: [{ name: dict.author }],
    metadataBase: new URL(defaultUrl),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = await getUserFromJWT();
  const language =
    (user?.preferred_lang as 'en' | 'bg') ||
    (cookieStore.get('language')?.value as 'en' | 'bg') ||
    'en';

  const theme =
    user?.preferred_theme || cookieStore.get('theme')?.value || 'light';

  const initialDarkMode = theme === 'dark';
  return (
    <html
      lang={language}
      suppressHydrationWarning
      data-theme={initialDarkMode ? 'dark' : 'light'}
    >
      <body
        className={`flex flex-col min-h-screen ${montserrat.variable} ${roboto.variable} ${orbitron.variable}`}
      >
        <LanguageProvider initialLanguage={language}>
          <ThemeProvider initialDarkMode={initialDarkMode}>
            <AuthProvider initialUser={user}>
              <Header />
              <main className='flex flex-col flex-1'>{children}</main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
