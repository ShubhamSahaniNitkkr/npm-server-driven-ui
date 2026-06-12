import { describe, expect, it } from 'vitest';
import { validateWithRules } from '../src/validation/builtInValidators';

describe('validation', () => {
  const validators = new Map();

  it('validates required', () => {
    expect(validateWithRules('', [{ rule: 'required' }], validators)).toBeDefined();
    expect(validateWithRules('ok', [{ rule: 'required' }], validators)).toBeUndefined();
  });

  it('validates email', () => {
    expect(validateWithRules('bad', [{ rule: 'email' }], validators)).toBeDefined();
    expect(validateWithRules('a@b.com', [{ rule: 'email' }], validators)).toBeUndefined();
  });

  it('validates minLength and maxLength', () => {
    expect(validateWithRules('ab', [{ rule: 'minLength', value: 3 }], validators)).toBeDefined();
    expect(validateWithRules('abcdef', [{ rule: 'maxLength', value: 3 }], validators)).toBeDefined();
  });
});
