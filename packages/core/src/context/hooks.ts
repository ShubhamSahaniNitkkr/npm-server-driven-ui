export { useSDUIContext, useOptionalSDUIContext } from './SDUIContext';
export {
  useFormContext,
  useOptionalFormContext,
} from '../forms/FormProvider';

import { useCallback } from 'react';
import type { ActionContext, ActionSchema } from '../actions/types';
import { useOptionalFormContext } from '../forms/FormProvider';
import { useOptionalSDUIContext } from './SDUIContext';

export function useAction() {
  const sdui = useOptionalSDUIContext();
  const form = useOptionalFormContext();

  return useCallback(
    (actions: ActionSchema | ActionSchema[], partialCtx?: Partial<ActionContext>) => {
      return sdui?.dispatchAction(actions, {
        formState: form?.values ?? {},
        setFormField: form?.setField ?? (() => {}),
        ...partialCtx,
      });
    },
    [form, sdui],
  );
}

export function useFormState(): Record<string, unknown> {
  const form = useOptionalFormContext();
  return form?.values ?? {};
}
