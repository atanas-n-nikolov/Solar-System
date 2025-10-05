import { InputHTMLAttributes, ReactNode, useState } from 'react';
import EyeIcon from '../svg/EyeIcon';
import EyeOffIcon from '../svg/EyeOffIcon';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type CreateInputProps<T extends FieldValues> = {
  inputFields: string[];
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

  const renderField = (field: string) => {
    const isPassword = field === 'password' || field === 'repassword';
    const show = field === 'password' ? showPassword : showRePassword;

    return (
      <div key={field} className='flex flex-col gap-1'>
        <div className='relative flex items-center gradient-ring'>
          <label htmlFor={field} className='sr-only'>
            {labelMap[field]}
          </label>

          <div className='pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 gap-4'>
            {iconMap[field]}
            <div>
              <div className='h-full border-r border-[#CDD0DB]' />
            </div>
          </div>

          <input
            id={field}
            {...register(field as any)}
            type={isPassword ? (show ? 'text' : 'password') : 'text'}
            placeholder={labelMap[field]}
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
    inputFields.includes('firstName') && inputFields.includes('lastName');

  const groupFields = hasNameGroup ? ['firstName', 'lastName'] : [];

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
