import { schemas } from './formSchemas';
import { validateSchema } from './validation';
import type { SignupFormData, LoginFormData } from './formSchemas';

type SchemaTypeMap = {
  signup: SignupFormData;
  login: LoginFormData;
};

export function validateForm<T extends keyof SchemaTypeMap>(
  type: T,
  data: SchemaTypeMap[T]
): Record<keyof SchemaTypeMap[T], string | null> {
  const schema = schemas[type] as any;
  return validateSchema(data, schema);
}
