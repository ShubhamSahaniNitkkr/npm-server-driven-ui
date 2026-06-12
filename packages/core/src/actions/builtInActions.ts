import type { ActionContext, ActionHandler, ActionSchema } from './types';

function resolveTemplateString(template: string, ctx: ActionContext): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, path: string) => {
    const trimmed = path.trim();
    const source = trimmed.startsWith('row.')
      ? ctx.row
      : { ...ctx.context, ...ctx.formState, row: ctx.row };
    const value = trimmed.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source as Record<string, unknown>);
    return value !== undefined && value !== null ? String(value) : '';
  });
}

export function createBuiltInActions(handlers: {
  navigate?: (path: string) => void;
  onSubmit?: (formState: Record<string, unknown>, action: ActionSchema) => void | Promise<void>;
  apiCall?: (action: ActionSchema, ctx: ActionContext) => Promise<unknown>;
}): Record<string, ActionHandler> {
  return {
    navigate: (action, ctx) => {
      if (!action.path) return;
      const path = resolveTemplateString(action.path, ctx);
      handlers.navigate?.(path);
    },
    submit: async (action, ctx) => {
      await handlers.onSubmit?.(ctx.formState, action);
    },
    openModal: (action, ctx) => {
      if (!action.modalId) return;
      ctx.openModal(action.modalId, action.payload);
    },
    closeModal: (action, ctx) => {
      if (!action.modalId) return;
      ctx.closeModal(action.modalId);
    },
    setField: (action, ctx) => {
      if (!action.field) return;
      ctx.setFormField(action.field, action.value);
    },
    apiCall: async (action, ctx) => {
      if (handlers.apiCall) {
        await handlers.apiCall(action, ctx);
        return;
      }
      if (!action.url) return;
      const url = resolveTemplateString(action.url, ctx);
      const method = action.method ?? 'GET';
      const body =
        method !== 'GET' ? JSON.stringify({ ...ctx.formState, ...action.payload }) : undefined;
      await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body,
      });
    },
    onClick: async (action, ctx) => {
      if (action.payload) {
        Object.entries(action.payload).forEach(([key, value]) => {
          ctx.setFormField(key, value);
        });
      }
    },
  };
}
