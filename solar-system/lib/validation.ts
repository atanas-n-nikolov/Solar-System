export type ValidatorFn<T, All> = (value: T, data: All) => string | null;

export type Schema<T> = {
  [K in keyof T]: ValidatorFn<T[K], T>;
};

export function validateSchema<T>(
  data: T,
  schema: Schema<T>
): Record<keyof T, string | null> {
  const errors = {} as Record<keyof T, string | null>;
  for (const key of Object.keys(schema) as (keyof T)[]) {
    errors[key] = schema[key](data[key], data);
  }
  return errors;
}
