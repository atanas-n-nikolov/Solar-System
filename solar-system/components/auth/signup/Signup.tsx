'use client';
import { z } from 'zod';
import { signUpUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import { useLanguage } from '@/context/languageProvider';
import { AuthProps } from '@/types/auth';
import AuthForm from '@/components/authForm/AuthForm';
import Image from 'next/image';
import Link from 'next/link';

const signupSchema = z
  .object({
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.email('Plese enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    repassword: z.string().min(6, 'Please repeat your password'),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords don't match",
    path: ['repassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

type SignupProps = {
  section: AuthProps[];
};

export default function Signup({ section }: SignupProps) {
  const { language } = useLanguage();
  const t = { en, bg }[language];
  const router = useRouter();

  const signup = section[0];

  const form_title =
    language === 'en' ? signup.form_title_en : signup.form_title_bg;
  const form_description =
    language === 'en' ? signup.form_description_en : signup.form_description_bg;
  const hero_title =
    language === 'en' ? signup.hero_title_en : signup.hero_title_bg;
  const hero_description_start =
    language === 'en'
      ? signup.hero_description_start_en
      : signup.hero_description_start_bg;
  const hero_description_end =
    language === 'en'
      ? signup.hero_description_end_en
      : signup.hero_description_end_bg;

  const inputFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'repassword',
  ];

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signUpUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      alert('Check your email to confirm registration!');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Signup error:', err.message);
        alert(err.message);
      } else {
        console.error('Signup error:', err);
        alert(err);
      }
    }
  };
  if (!section) return null;

  return (
    <section className='w-full overflow-hidden max-w-[1216px] m-auto'>
      <AuthForm
        schema={signupSchema}
        formTitle={form_title}
        formDescription={form_description}
        onSubmit={onSubmit}
        inputFields={inputFields}
        t={t}
      />
      <div className='absolute top-0 bottom-0 right-0 w-[58.85vw] pointer-events-none bg-gray-200'>
        <Image
          src={signup.image_url}
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
                href='/login'
                className='relative font-medium bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text text-transparent'
              >
                {t.login}{' '}
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

{
  /* <section className='w-full overflow-hidden max-w-[1216px] m-auto'>
        <form
          onSubmit={handleSignup(onSignup)}
          className='flex flex-col relative h-full w-full max-w-[380px] z-20 gap-8 p-2'
        >
          <header className='flex flex-col justify-center gap-2'>
            <h1 className='font-montserrat text-2xl font-black'>
              {form_title}
            </h1>
            <p className='font-light'>{form_description}</p>
            {Object.keys(signupErrors).length > 0 && (
              <p className='text-sm font-light text-[#FD4255]' role='alert'>
                {t.form_error}
              </p>
            )}
          </header>
          <div className='flex flex-col gap-4'>
            <div className='flex w-full gap-2'>
              <div className='flex flex-col gap-1'>
                <div className='relative flex items-center gradient-ring'>
                  <label htmlFor='firstName' className='sr-only'>
                    {t.auth_firstname}
                  </label>
                  <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
                    <UserIcon className='shrink-0' />
                    <div>
                      <div className='h-full border-r border-[#CDD0DB]'></div>
                    </div>
                  </div>
                  <input
                    {...registerSignup('firstName')}
                    id='firstName'
                    type='text'
                    aria-invalid={!!signupErrors.firstName}
                    className={`h-12 w-full rounded-full border-none bg-white px-4 focus:outline-none hover:ring-2 ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light pl-[68px] focus:gradient-ring ${
                      signupErrors.firstName
                        ? 'ring-[#FD4255] ring-2'
                        : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
                    }`}
                    placeholder={t.form_f_name}
                    maxLength={254}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='relative flex items-center gradient-ring'>
                  <label htmlFor='lastName' className='sr-only'>
                    {t.auth_lastname}
                  </label>
                  <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
                    <UserIcon className='shrink-0' />
                    <div>
                      <div className='h-full border-r border-[#CDD0DB]'></div>
                    </div>
                  </div>
                  <input
                    {...registerSignup('lastName')}
                    id='lastName'
                    type='text'
                    aria-invalid={!!signupErrors.lastName}
                    className={`h-12 w-full rounded-full border-none bg-white px-4 focus:outline-none hover:ring-2 ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light pl-[68px] focus:gradient-ring ${
                      signupErrors.firstName
                        ? 'ring-[#FD4255] ring-2'
                        : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
                    }`}
                    placeholder={t.form_l_name}
                    maxLength={254}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='relative flex items-center gradient-ring'>
                <label htmlFor='email' className='sr-only'>
                  {t.auth_email}
                </label>
                <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
                  <EmailIcon className='shrink-0' />
                  <div>
                    <div className='h-full border-r border-[#CDD0DB]'></div>
                  </div>
                </div>
                <input
                  {...registerSignup('email')}
                  id='email'
                  type='email'
                  aria-invalid={!!signupErrors.email}
                  className={`h-12 w-full rounded-full border-none bg-white px-4 focus:outline-none hover:ring-2 ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light pl-[68px] focus:gradient-ring ${
                    signupErrors.firstName
                      ? 'ring-[#FD4255] ring-2'
                      : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
                  }`}
                  placeholder={t.form_email}
                  maxLength={254}
                />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='relative flex items-center gradient-ring'>
                <label htmlFor='password' className='sr-only'>
                  {t.auth_password}
                </label>
                <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
                  <LockIcon className='shrink-0' />
                  <div>
                    <div className='h-full border-r border-[#CDD0DB]'></div>
                  </div>
                </div>
                <input
                  {...registerSignup('password')}
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={!!signupErrors.password}
                  className={`h-12 w-full rounded-full border-none bg-white px-4 focus:outline-none hover:ring-2 ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light pl-[68px] focus:gradient-ring ${
                    signupErrors.firstName
                      ? 'ring-[#FD4255] ring-2'
                      : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
                  }`}
                  placeholder={t.form_password}
                  maxLength={254}
                />
                <button
                  onClick={togglePassword}
                  type='button'
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-grey'
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='relative flex items-center gradient-ring'>
                <label htmlFor='repassword' className='sr-only'>
                  {t.auth_repeat_password}
                </label>
                <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
                  <LockIcon className='shrink-0' />
                  <div>
                    <div className='h-full border-r border-[#CDD0DB]'></div>
                  </div>
                </div>
                <input
                  {...registerSignup('repassword')}
                  id='repassword'
                  type={showRePassword ? 'text' : 'password'}
                  aria-invalid={!!signupErrors.repassword}
                  className={`h-12 w-full rounded-full border-none bg-white px-4 focus:outline-none hover:ring-2 ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light pl-[68px] focus:gradient-ring ${
                    signupErrors.firstName
                      ? 'ring-[#FD4255] ring-2'
                      : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
                  }`}
                  placeholder={t.form_repassword}
                  maxLength={254}
                />
                <button
                  onClick={toggleRePassword}
                  type='button'
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-grey'
                >
                  {showRePassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className='h-12 flex items-center gap-2 justify-center py-2 px-6 rounded-full text-white bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
            >
              {t.signup}
              <Arrow />
            </button>
          </div>
          <div className='flex items-center gap-4'>
            <div className='h-px w-full bg-[#CDD0DB80]'></div>
            <p className='text-[#84868E]'>{t.or}</p>
            <div className='h-px w-full bg-[#CDD0DB80]'></div>
          </div>
          <Link
            href='/'
            className='flex items-center justify-center text-[#3F3E3E] gap-2 h-12 w-full rounded-full px-4 focus:outline-none ring-1 ring-[#CDD0DB] ring-inset transition font-light hover:shadow-[0px_1px_8px_0px_#3f486729]'
          >
            <GoogleLogo />
            {t.with_google}
          </Link>
        </form>

        <div className='absolute top-0 bottom-0 right-0 w-[58.85vw] pointer-events-none bg-gray-200'>
          <Image
            src={signup.image_url}
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
                  href='/'
                  className='relative font-medium bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] bg-clip-text text-transparent'
                >
                  {t.login}{' '}
                  <span className='absolute left-0 bottom-0.5 h-px w-full bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE] pointer-events-none'></span>
                </Link>
                {hero_description_end}
              </p>
            </div>
          </div>
        </div>
      </section> */
}
