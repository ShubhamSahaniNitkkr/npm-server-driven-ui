import type { ValidatorFn, ValidatorRegistry } from './types';

export function createValidatorRegistry(): ValidatorRegistry {
  const validators = new Map<string, ValidatorFn>();

  return {
    validators,
    register(name: string, validator: ValidatorFn) {
      validators.set(name, validator);
    },
    unregister(name: string) {
      validators.delete(name);
    },
    get(name: string) {
      return validators.get(name);
    },
  };
}

export function registerValidator(
  name: string,
  validator: ValidatorFn,
  registry?: ValidatorRegistry,
): void {
  const target = registry ?? createValidatorRegistry();
  target.register(name, validator);
}
