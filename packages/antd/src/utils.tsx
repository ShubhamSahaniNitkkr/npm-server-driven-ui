import type { AdapterProps } from './types';

export function pickSchemaProps<T extends Record<string, unknown>>(
  schema: AdapterProps['schema'],
  keys: (keyof T)[],
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (key in schema) {
      result[key] = schema[key as string] as T[keyof T];
    }
  }
  return result;
}
