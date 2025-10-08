'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useLanguage } from '@/context/languageProvider';
import en from '@/locales/en.json';
import bg from '@/locales/bg.json';
import UserIcon from '@/components/svg/UserIcon';
import EmailIcon from '@/components/svg/EmailIcon';
import LockIcon from '@/components/svg/LockIcon';
import Arrow from '@/components/svg/Arrow';
import Link from 'next/link';
import GoogleLogo from '@/components/svg/GoogleLogo';

import CreateInput from './CreateInput';
import { ZodObject, ZodRawShape } from 'zod';

type AuthFormProps<TFormData extends FieldValues> = {
  schema: ZodObject<ZodRawShape>;
  formTitle: string;
  formDescription: string;
  onSubmit: SubmitHandler<TFormData>;
  inputFields: string[];
};

export default function AuthForm<TFormData extends FieldValues>({
  schema: schemaProp,
  formTitle,
  formDescription,
  onSubmit,
  inputFields,
}: AuthFormProps<TFormData>) {
  const { language } = useLanguage();
  const t = { en, bg }[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schemaProp) as Resolver<TFormData>,
    shouldFocusError: false,
  });

  const handleFormSubmit = (data: TFormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col relative h-full w-full max-w-[380px] z-20 gap-8 p-2'
    >
      <header className='flex flex-col justify-center gap-2'>
        <h1 className='font-montserrat text-2xl font-black'>{formTitle}</h1>
        <p className='font-light'>{formDescription}</p>
        {Object.keys(errors).length > 0 && (
          <p className='text-sm font-light text-[#FD4255]' role='alert'>
            {t.form_error}
          </p>
        )}
      </header>
      <div className='flex flex-col gap-4'>
        <CreateInput
          register={register}
          errors={errors}
          inputFields={inputFields}
          labelMap={{
            firstName: t.form_f_name,
            lastName: t.form_l_name,
            email: t.form_email,
            password: t.form_password,
            repassword: t.form_repeat_password,
          }}
          iconMap={{
            firstName: <UserIcon />,
            lastName: <UserIcon />,
            email: <EmailIcon />,
            password: <LockIcon />,
            repassword: <LockIcon />,
          }}
        />
        <button
          type='submit'
          aria-label={t.signup}
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
  );
}
