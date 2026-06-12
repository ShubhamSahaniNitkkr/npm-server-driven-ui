import type { ValidationRule, ValidatorFn } from './types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const builtInValidators: Record<string, ValidatorFn> = {
  required: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    if (Array.isArray(value) && value.length === 0) return 'This field is required';
    return undefined;
  },
  email: (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    return EMAIL_PATTERN.test(String(value)) ? undefined : 'Invalid email address';
  },
};

export function validateWithRules(
  value: unknown,
  rules: ValidationRule[] | undefined,
  customValidators: Map<string, ValidatorFn>,
  ctx?: Record<string, unknown>,
): string | undefined {
  if (!rules?.length) return undefined;

  for (const rule of rules) {
    let error: string | undefined;

    if (rule.rule === 'custom') {
      const validator = customValidators.get(rule.name);
      error = validator?.(value, ctx);
    } else if (rule.rule === 'required') {
      error = builtInValidators.required(value);
    } else if (rule.rule === 'email') {
      error = builtInValidators.email(value);
    } else if (rule.rule === 'minLength') {
      if (String(value ?? '').length < rule.value) {
        error = rule.message ?? `Minimum length is ${rule.value}`;
      }
    } else if (rule.rule === 'maxLength') {
      if (String(value ?? '').length > rule.value) {
        error = rule.message ?? `Maximum length is ${rule.value}`;
      }
    } else if (rule.rule === 'min') {
      if (typeof value === 'number' && value < rule.value) {
        error = rule.message ?? `Minimum value is ${rule.value}`;
      }
    } else if (rule.rule === 'max') {
      if (typeof value === 'number' && value > rule.value) {
        error = rule.message ?? `Maximum value is ${rule.value}`;
      }
    } else if (rule.rule === 'pattern') {
      if (value !== undefined && value !== null && value !== '') {
        const regex = new RegExp(rule.value);
        if (!regex.test(String(value))) {
          error = rule.message ?? 'Invalid format';
        }
      }
    }

    if (error) return rule.message ?? error;
  }

  return undefined;
}
