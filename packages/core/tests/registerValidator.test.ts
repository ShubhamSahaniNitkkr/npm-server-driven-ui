import { describe, expect, it } from 'vitest';
import { createValidatorRegistry, registerValidator } from '../src/validation/registerValidator';

describe('registerValidator', () => {
  it('registers and retrieves validators', () => {
    const registry = createValidatorRegistry();
    registerValidator('min3', (value) => (String(value).length < 3 ? 'Too short' : undefined), registry);
    expect(registry.get('min3')?.('ab')).toBe('Too short');
    expect(registry.get('min3')?.('abc')).toBeUndefined();
  });

  it('unregisters validators', () => {
    const registry = createValidatorRegistry();
    registerValidator('test', () => 'err', registry);
    registry.unregister('test');
    expect(registry.get('test')).toBeUndefined();
  });
});
