import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { validateWithRules } from '../validation/builtInValidators';
import type { ValidationRule } from '../validation/types';
import type { FormContextValue } from './types';

interface FormProviderProps {
  children: ReactNode;
  initialValues?: Record<string, unknown>;
  controlledValues?: Record<string, unknown>;
  onChange?: (values: Record<string, unknown>) => void;
  fieldRules?: Record<string, ValidationRule[]>;
  validators: Map<string, import('../validation/types').ValidatorFn>;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({
  children,
  initialValues = {},
  controlledValues,
  onChange,
  fieldRules = {},
  validators,
}: FormProviderProps) {
  const [internalValues, setInternalValues] = useState<Record<string, unknown>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [, setTouched] = useState<Record<string, boolean>>({});

  const values = controlledValues ?? internalValues;

  const setField = useCallback(
    (name: string, value: unknown) => {
      const next = { ...values, [name]: value };
      if (!controlledValues) setInternalValues(next);
      onChange?.(next);
    },
    [controlledValues, onChange, values],
  );

  const setError = useCallback((name: string, error: string | undefined) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const touchField = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback(
    (name: string) => {
      const error = validateWithRules(values[name], fieldRules[name], validators, values);
      setErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    },
    [fieldRules, validators, values],
  );

  const getFieldValue = useCallback((name: string) => values[name], [values]);

  const contextValue = useMemo<FormContextValue>(
    () => ({
      values,
      errors,
      setField,
      setError,
      touchField,
      validateField,
      getFieldValue,
    }),
    [errors, getFieldValue, setError, setField, touchField, validateField, values],
  );

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}

export function useFormContext(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return ctx;
}

export function useOptionalFormContext(): FormContextValue | null {
  return useContext(FormContext);
}

export function collectFieldRules(
  schemas: import('../schema/types').SDUISchema[],
): Record<string, ValidationRule[]> {
  const rules: Record<string, ValidationRule[]> = {};

  const walk = (nodes: import('../schema/types').SDUISchema[]) => {
    for (const node of nodes) {
      if (node.name && 'validation' in node && Array.isArray(node.validation)) {
        rules[node.name] = node.validation as ValidationRule[];
      }
      if ('required' in node && node.required && node.name) {
        rules[node.name] = [
          { rule: 'required', message: 'This field is required' },
          ...(rules[node.name] ?? []),
        ];
      }
      if (node.children) walk(node.children);
    }
  };

  walk(schemas);
  return rules;
}
