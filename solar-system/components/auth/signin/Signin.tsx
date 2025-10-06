'use client';
import { z } from 'zod';
import { signInUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import { AuthProps } from '@/types/auth';
import AuthForm from '@/components/authForm/AuthForm';
import Image from 'next/image';
import Link from 'next/link';

const signinSchema = z.object({
  email: z.email({ message: 'Plese enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type SigninFormData = z.infer<typeof signinSchema>;

type SigninProps = {
  section: AuthProps[];
};

export default function Signin({ section }: SigninProps) {
  const { language } = useLanguage();
  const t = { en, bg }[language];
  const router = useRouter();

  const signin = section[0];

  const form_title =
    language === 'en' ? signin.form_title_en : signin.form_title_bg;
  const form_description =
    language === 'en' ? signin.form_description_en : signin.form_description_bg;
  const hero_title =
    language === 'en' ? signin.hero_title_en : signin.hero_title_bg;
  const hero_description_start =
    language === 'en'
      ? signin.hero_description_start_en
      : signin.hero_description_start_bg;
  const hero_description_end =
    language === 'en'
      ? signin.hero_description_end_en
      : signin.hero_description_end_bg;

  const optimizedUrl = signin.image_url.replace(
    '/upload/',
    '/upload/f_auto,q_auto,w_758/'
  );

  const inputFields = ['email', 'password'];
  if (!section) return null;

  const onSubmit = async (data: SigninFormData) => {
    try {
      await signInUser({
        email: data.email,
        password: data.password,
      });
      alert('Logged in successfully!');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        let message;
        switch (err.message) {
          case 'Invalid login credentials':
            message = 'Invalid email or password!';
            break;
        }
        alert(message);
      } else alert('Login failed');
    }
  };

  return (
    <section className='w-full overflow-hidden max-w-[1216px] m-auto'>
      <AuthForm
        schema={signinSchema}
        formTitle={form_title}
        formDescription={form_description}
        onSubmit={onSubmit}
        inputFields={inputFields}
      />
      <div className='absolute top-0 bottom-0 right-0 w-[58.85vw] pointer-events-none bg-gray-200'>
        <Image
          src={optimizedUrl}
          alt='Signup background'
          fill
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
          fetchPriority='high'
        />

        <div className='absolute inset-0 bg-[#232531CC] z-0' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
          <div className='max-w-[440px] flex flex-col items-center relative z-10 gap-4'>
            <h1 className='font-montserrat text-center text-white font-black text-[72px] leading-[80px] tracking-wide'>
              {hero_title}
            </h1>
            <p className='text-[#FFFFFFCC] font-light text-center text-lg pointer-events-auto z-[999]'>
              {hero_description_start}{' '}
              <Link
                href='/signup'
                className='relative font-medium bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text text-transparent'
              >
                {t.signup}{' '}
                <span className='absolute left-0 bottom-0.5 h-px w-full bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] pointer-events-none'></span>
              </Link>
              {hero_description_end}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
