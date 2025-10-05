'use client';
import { useState } from 'react';
import { validateForm } from '@/lib/formValidator';
import type { SignupFormData, LoginFormData } from '@/lib/formSchemas';

type FormType = 'signup' | 'login';

type SchemaMap = {
  signup: SignupFormData;
  login: LoginFormData;
};

export function useFormValidator<T extends FormType>(type: T) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof SchemaMap[T], string>>
  >({});

  const validate = (data: SchemaMap[T]) => {
    const result = validateForm(type, data);
    const filtered = Object.fromEntries(
      Object.entries(result).filter(([, v]) => v !== null)
    ) as Partial<Record<keyof SchemaMap[T], string>>;
    setErrors(filtered);
    return filtered;
  };

  const isValid = (data: SchemaMap[T]) => {
    const errs = validate(data);
    return Object.keys(errs).length === 0;
  };

  return { errors, validate, isValid, setErrors };
}
