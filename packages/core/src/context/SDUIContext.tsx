import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { createActionDispatcher } from '../actions/createActionDispatcher';
import { createBuiltInActions } from '../actions/builtInActions';
import type { ActionContext, ActionSchema } from '../actions/types';
import type { ComponentRegistry } from '../registry/types';
import type { ThemeConfig } from '../schema/types';
import { resolveTheme } from '../theme/themes';

export interface SDUIProviderProps {
  children: ReactNode;
  registry?: ComponentRegistry | null;
  theme?: ThemeConfig | 'light' | 'dark';
  context?: Record<string, unknown>;
  onNavigate?: (path: string) => void;
  onSubmit?: (formState: Record<string, unknown>, action: ActionSchema) => void | Promise<void>;
  onAction?: (action: ActionSchema, ctx: ActionContext) => void;
  apiCall?: (action: ActionSchema, ctx: ActionContext) => Promise<unknown>;
}

interface SDUIContextValue {
  registry: ComponentRegistry | null;
  theme: ThemeConfig;
  runtimeContext: Record<string, unknown>;
  openModals: Set<string>;
  modalPayloads: Record<string, Record<string, unknown>>;
  openModal: (modalId: string, payload?: Record<string, unknown>) => void;
  closeModal: (modalId: string) => void;
  dispatchAction: (actions: ActionSchema | ActionSchema[], partialCtx?: Partial<ActionContext>) => Promise<void>;
}

const SDUIContext = createContext<SDUIContextValue | null>(null);

export function SDUIProvider({
  children,
  registry = null,
  theme = 'light',
  context = {},
  onNavigate,
  onSubmit,
  onAction,
  apiCall,
}: SDUIProviderProps) {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());
  const [modalPayloads, setModalPayloads] = useState<Record<string, Record<string, unknown>>>({});

  const resolvedTheme = resolveTheme(theme);

  const value = useMemo<SDUIContextValue>(() => {
    const openModal = (modalId: string, payload?: Record<string, unknown>) => {
      setOpenModals((prev) => new Set(prev).add(modalId));
      if (payload) {
        setModalPayloads((prev) => ({ ...prev, [modalId]: payload }));
      }
    };

    const closeModal = (modalId: string) => {
      setOpenModals((prev) => {
        const next = new Set(prev);
        next.delete(modalId);
        return next;
      });
    };

    const builtIn = createBuiltInActions({ navigate: onNavigate, onSubmit, apiCall });
    const dispatchAction = createActionDispatcher({
      registry: registry?.actions ?? { handlers: new Map(), register: () => {}, unregister: () => {}, get: () => undefined },
      builtIn,
      onAction,
    });

    return {
      registry,
      theme: resolvedTheme,
      runtimeContext: context,
      openModals,
      modalPayloads,
      openModal,
      closeModal,
      dispatchAction: async (actions, partialCtx) => {
        const baseCtx: ActionContext = {
          formState: partialCtx?.formState ?? {},
          context,
          row: partialCtx?.row,
          event: partialCtx?.event,
          setFormField: partialCtx?.setFormField ?? (() => {}),
          openModal,
          closeModal,
        };
        await dispatchAction(actions, baseCtx);
      },
    };
  }, [apiCall, context, onAction, onNavigate, onSubmit, openModals, modalPayloads, registry, resolvedTheme]);

  return <SDUIContext.Provider value={value}>{children}</SDUIContext.Provider>;
}

export function useSDUIContext(): SDUIContextValue {
  const ctx = useContext(SDUIContext);
  if (!ctx) {
    throw new Error('useSDUIContext must be used within SDUIProvider');
  }
  return ctx;
}

export function useOptionalSDUIContext(): SDUIContextValue | null {
  return useContext(SDUIContext);
}
