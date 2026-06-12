import React, { Suspense, useMemo, type ComponentType } from 'react';
import { SDUIProvider } from '../context/SDUIContext';
import { collectFieldRules, FormProvider } from '../forms/FormProvider';
import { createRegistry } from '../registry/createRegistry';
import type { ComponentRegistry } from '../registry/types';
import type { SDUISchema } from '../schema/types';
import type { ThemeConfig } from '../schema/types';
import { normalizeSchema } from '../schema/normalizeSchema';
import type { ActionContext, ActionSchema } from '../actions/types';
import { FallbackComponent } from './FallbackComponent';
import { SchemaNode } from './SchemaNode';

export interface SDUIRendererProps {
  schema: SDUISchema | SDUISchema[];
  registry?: ComponentRegistry;
  context?: Record<string, unknown>;
  formState?: Record<string, unknown>;
  onFormChange?: (state: Record<string, unknown>) => void;
  onAction?: (action: ActionSchema, ctx: ActionContext) => void;
  onNavigate?: (path: string) => void;
  onSubmit?: (formState: Record<string, unknown>, action: ActionSchema) => void | Promise<void>;
  theme?: ThemeConfig | 'light' | 'dark';
  fallback?: ComponentType<{ schema: SDUISchema; type: string }>;
  loading?: boolean;
  error?: Error | null;
}

function SchemaTree({
  schema,
  registry,
  fallback,
}: {
  schema: SDUISchema | SDUISchema[];
  registry: ComponentRegistry;
  fallback?: ComponentType<{ schema: SDUISchema; type: string }>;
}) {
  const nodes = useMemo(() => {
    const normalized = normalizeSchema(schema);
    return Array.isArray(normalized) ? normalized : [normalized];
  }, [schema]);

  return (
    <>
      {nodes.map((node, index) => (
        <SchemaNode
          key={node.id ?? `root-${index}`}
          schema={node}
          registry={registry}
          Fallback={fallback ?? FallbackComponent}
        />
      ))}
    </>
  );
}

export const SDUIRenderer = React.memo(function SDUIRenderer({
  schema,
  registry: registryProp,
  context = {},
  formState,
  onFormChange,
  onAction,
  onNavigate,
  onSubmit,
  theme = 'light',
  fallback,
  loading,
  error,
}: SDUIRendererProps) {
  const registry = useMemo(() => registryProp ?? createRegistry(), [registryProp]);

  const fieldRules = useMemo(() => {
    const nodes = Array.isArray(schema) ? schema : [schema];
    return collectFieldRules(nodes);
  }, [schema]);

  if (loading) {
    return <div data-sdui-loading>Loading...</div>;
  }

  if (error) {
    return <div data-sdui-error>{error.message}</div>;
  }

  return (
    <SDUIProvider
      registry={registry}
      theme={theme}
      context={context}
      onNavigate={onNavigate}
      onSubmit={onSubmit}
      onAction={onAction}
    >
      <FormProvider
        initialValues={formState ?? {}}
        controlledValues={formState}
        onChange={onFormChange}
        fieldRules={fieldRules}
        validators={registry.validators.validators}
      >
        <Suspense fallback={<div data-sdui-loading>Loading...</div>}>
          <SchemaTree schema={schema} registry={registry} fallback={fallback} />
        </Suspense>
      </FormProvider>
    </SDUIProvider>
  );
});
