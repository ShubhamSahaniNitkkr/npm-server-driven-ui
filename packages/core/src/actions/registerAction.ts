import type { ActionHandler, ActionRegistry } from './types';

export function createActionRegistry(): ActionRegistry {
  const handlers = new Map<string, ActionHandler>();

  return {
    handlers,
    register(name: string, handler: ActionHandler) {
      handlers.set(name, handler);
    },
    unregister(name: string) {
      handlers.delete(name);
    },
    get(name: string) {
      return handlers.get(name);
    },
  };
}

export function registerAction(
  name: string,
  handler: ActionHandler,
  registry?: ActionRegistry,
): void {
  const target = registry ?? createActionRegistry();
  target.register(name, handler);
}
