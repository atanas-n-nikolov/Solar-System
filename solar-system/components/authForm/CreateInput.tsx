import { InputHTMLAttributes, ReactNode, useState } from 'react';
import EyeIcon from '../svg/EyeIcon';
import EyeOffIcon from '../svg/EyeOffIcon';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type CreateInputProps<T extends FieldValues> = {
  inputFields: (keyof T)[];
  labelMap: Record<string, string>;
  iconMap: Record<string, ReactNode>;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function CreateInput<T extends FieldValues>({
  inputFields,
  labelMap,
  iconMap,
  errors,
  register,
  ...props
}: CreateInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const renderField = (field: keyof T) => {
    const fieldStr = field as Path<T>;
    const isPassword = field === 'password' || fieldStr === 'repassword';
    const show = fieldStr === 'password' ? showPassword : showRePassword;

    return (
      <div key={String(field)} className='flex flex-col gap-1'>
        <div className='relative flex items-center gradient-ring'>
          <label htmlFor={String(field)} className='sr-only'>
            {labelMap[String(field)]}
          </label>

          <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
            {iconMap[String(field)]}
            <div>
              <div className='h-full border-r border-[#CDD0DB]' />
            </div>
          </div>

          <input
            id={String(field)}
            {...register(fieldStr)}
            type={isPassword ? (show ? 'text' : 'password') : 'text'}
            placeholder={labelMap[String(field)]}
            {...props}
            className={`h-12 w-full rounded-full border-none bg-white px-4 pl-[68px] focus:outline-none ring-1 ring-inset transition placeholder:text-[#8C92AF] placeholder:font-light focus:gradient-ring ${
              errors?.[field]
                ? 'ring-[#FD4255] ring-2'
                : 'ring-[#CDD0DB] hover:ring-[#CDD0DB]'
            } ${props.className ?? ''}`}
          />

          {isPassword && (
            <button
              type='button'
              aria-label={`${show ? 'hide' : 'show'} password`}
              onClick={() =>
                field === 'password'
                  ? setShowPassword((p) => !p)
                  : setShowRePassword((p) => !p)
              }
              className='absolute right-4 top-1/2 -translate-y-1/2 text-grey'
            >
              {show ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>
      </div>
    );
  };
  const hasNameGroup =
    inputFields.includes('firstName' as keyof T) &&
    inputFields.includes('lastName' as keyof T);

  const groupFields = hasNameGroup
    ? (['firstName', 'lastName'] as (keyof T)[])
    : [];
  const otherFields = inputFields.filter((f) => !groupFields.includes(f));
  return (
    <>
      {groupFields.length > 0 && (
        <div className='flex w-full gap-2'>{groupFields.map(renderField)}</div>
      )}

      {otherFields.map(renderField)}
    </>
  );
}
