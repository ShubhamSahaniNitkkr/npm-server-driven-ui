import { createActionRegistry } from '../actions/registerAction';
import { createValidatorRegistry } from '../validation/registerValidator';
import type { ComponentRegistry, RegistryEntry, SDUIComponent } from './types';

export function createRegistry(
  initial?: Record<string, SDUIComponent | RegistryEntry>,
): ComponentRegistry {
  const entries = new Map<string, RegistryEntry>();
  const actions = createActionRegistry();
  const validators = createValidatorRegistry();

  if (initial) {
    Object.entries(initial).forEach(([type, value]) => {
      if (typeof value === 'function' || '$$typeof' in (value as object)) {
        entries.set(type, { component: value as SDUIComponent });
      } else {
        entries.set(type, value as RegistryEntry);
      }
    });
  }

  return {
    entries,
    actions,
    validators,
    resolve(type: string) {
      return entries.get(type)?.component;
    },
    has(type: string) {
      return entries.has(type);
    },
    list() {
      return Array.from(entries.keys());
    },
  };
}

export function registerComponent(
  type: string,
  component: SDUIComponent,
  registry: ComponentRegistry,
  meta?: RegistryEntry['meta'],
): void {
  registry.entries.set(type, { component, meta });
}

export function unregisterComponent(type: string, registry: ComponentRegistry): void {
  registry.entries.delete(type);
}

export function mergeRegistries(...registries: ComponentRegistry[]): ComponentRegistry {
  const merged = createRegistry();
  for (const registry of registries) {
    registry.entries.forEach((entry, type) => merged.entries.set(type, entry));
    registry.actions.handlers.forEach((handler, name) => merged.actions.register(name, handler));
    registry.validators.validators.forEach((validator, name) =>
      merged.validators.register(name, validator),
    );
  }
  return merged;
}
