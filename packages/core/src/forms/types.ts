export interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
}

export interface FormContextValue {
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  setField: (name: string, value: unknown) => void;
  setError: (name: string, error: string | undefined) => void;
  touchField: (name: string) => void;
  validateField: (name: string) => string | undefined;
  getFieldValue: (name: string) => unknown;
}
