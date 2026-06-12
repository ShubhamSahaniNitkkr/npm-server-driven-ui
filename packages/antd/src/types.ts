import type { ReactNode } from 'react';
import type { ComponentRegistry } from '@shubhamsunnynitkkr/server-driven-ui';

export interface SDUIContextLike {
  runtimeContext?: Record<string, unknown>;
  openModals?: Set<string>;
  closeModal?: (id: string) => void;
}

export interface AdapterProps {
  schema: Record<string, unknown>;
  children?: ReactNode;
  value?: unknown;
  error?: string;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
  className?: string;
  style?: Record<string, string | number>;
  registry?: ComponentRegistry;
  row?: Record<string, unknown>;
  onClick?: () => void;
  sduiContext?: SDUIContextLike;
  formContext?: unknown;
  [key: string]: unknown;
}
