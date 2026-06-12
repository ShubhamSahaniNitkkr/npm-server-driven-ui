import type { ActionContext, ActionHandler, ActionRegistry, ActionSchema } from './types';

async function runAction(
  action: ActionSchema,
  ctx: ActionContext,
  registry: ActionRegistry,
  builtIn: Record<string, ActionHandler>,
  onAction?: (action: ActionSchema, ctx: ActionContext) => void,
): Promise<void> {
  const handler =
    builtIn[action.type] ??
    (action.type === 'customAction' && action.name ? registry.get(action.name) : undefined);

  try {
    if (handler) {
      await handler(action, ctx);
    }
    onAction?.(action, ctx);

    const successActions = action.onSuccess;
    if (successActions) {
      const list = Array.isArray(successActions) ? successActions : [successActions];
      for (const next of list) {
        await runAction(next, ctx, registry, builtIn, onAction);
      }
    }
  } catch {
    const errorActions = action.onError;
    if (errorActions) {
      const list = Array.isArray(errorActions) ? errorActions : [errorActions];
      for (const next of list) {
        await runAction(next, ctx, registry, builtIn, onAction);
      }
    }
  }
}

export function createActionDispatcher(options: {
  registry: ActionRegistry;
  builtIn: Record<string, ActionHandler>;
  onAction?: (action: ActionSchema, ctx: ActionContext) => void;
}) {
  return async (actions: ActionSchema | ActionSchema[], ctx: ActionContext) => {
    const list = Array.isArray(actions) ? actions : [actions];
    for (const action of list) {
      await runAction(action, ctx, options.registry, options.builtIn, options.onAction);
    }
  };
}
