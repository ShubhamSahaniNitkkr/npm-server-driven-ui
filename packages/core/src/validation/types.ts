export type ValidationRule =
  | { rule: 'required'; message?: string }
  | { rule: 'email'; message?: string }
  | { rule: 'minLength'; value: number; message?: string }
  | { rule: 'maxLength'; value: number; message?: string }
  | { rule: 'min'; value: number; message?: string }
  | { rule: 'max'; value: number; message?: string }
  | { rule: 'pattern'; value: string; message?: string }
  | { rule: 'custom'; name: string; message?: string };

export type ValidatorFn = (value: unknown, ctx?: Record<string, unknown>) => string | undefined;

export interface ValidatorRegistry {
  validators: Map<string, ValidatorFn>;
  register(name: string, validator: ValidatorFn): void;
  unregister(name: string): void;
  get(name: string): ValidatorFn | undefined;
}
