import type { ComponentType, LazyExoticComponent } from 'react';
import type { ActionRegistry } from '../actions/types';
import type { ValidatorRegistry } from '../validation/types';

export type SDUIComponent = ComponentType<Record<string, unknown>>;

export interface RegistryEntry {
  component: SDUIComponent | LazyExoticComponent<SDUIComponent>;
  meta?: {
    category?: string;
    lazy?: boolean;
    description?: string;
  };
}

export interface ComponentRegistry {
  entries: Map<string, RegistryEntry>;
  actions: ActionRegistry;
  validators: ValidatorRegistry;
  resolve(type: string): SDUIComponent | LazyExoticComponent<SDUIComponent> | undefined;
  has(type: string): boolean;
  list(): string[];
}
