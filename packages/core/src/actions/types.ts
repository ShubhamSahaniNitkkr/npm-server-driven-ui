export type ActionType =
  | 'onClick'
  | 'navigate'
  | 'submit'
  | 'openModal'
  | 'closeModal'
  | 'customAction'
  | 'setField'
  | 'apiCall';

export interface ActionSchema {
  type: ActionType | string;
  payload?: Record<string, unknown>;
  path?: string;
  modalId?: string;
  name?: string;
  formId?: string;
  field?: string;
  value?: unknown;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  onSuccess?: ActionSchema | ActionSchema[];
  onError?: ActionSchema | ActionSchema[];
}

export interface ActionContext {
  formState: Record<string, unknown>;
  context: Record<string, unknown>;
  row?: Record<string, unknown>;
  event?: unknown;
  setFormField: (name: string, value: unknown) => void;
  openModal: (modalId: string, payload?: Record<string, unknown>) => void;
  closeModal: (modalId: string) => void;
}

export type ActionHandler = (
  action: ActionSchema,
  ctx: ActionContext,
) => void | Promise<void>;

export interface ActionRegistry {
  handlers: Map<string, ActionHandler>;
  register(name: string, handler: ActionHandler): void;
  unregister(name: string): void;
  get(name: string): ActionHandler | undefined;
}
