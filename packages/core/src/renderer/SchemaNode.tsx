import React, { useCallback, useMemo, type ComponentType } from 'react';
import { evaluateCondition } from '../conditions/evaluateCondition';
import { useOptionalFormContext } from '../forms/FormProvider';
import { useOptionalSDUIContext } from '../context/SDUIContext';
import type { ComponentRegistry } from '../registry/types';
import type { SDUISchema } from '../schema/types';
import type { ActionSchema } from '../actions/types';
import { FallbackComponent } from './FallbackComponent';

export interface SchemaNodeProps {
  schema: SDUISchema;
  registry: ComponentRegistry;
  row?: Record<string, unknown>;
  Fallback?: ComponentType<{ schema: SDUISchema; type: string }>;
}

function useConditionContext(row?: Record<string, unknown>) {
  const form = useOptionalFormContext();
  const sdui = useOptionalSDUIContext();

  return useMemo(
    () => ({
      ...sdui?.runtimeContext,
      ...form?.values,
      row,
    }),
    [form?.values, row, sdui?.runtimeContext],
  );
}

export const SchemaNode = React.memo(function SchemaNode({
  schema,
  registry,
  row,
  Fallback = FallbackComponent,
}: SchemaNodeProps) {
  const form = useOptionalFormContext();
  const sdui = useOptionalSDUIContext();
  const conditionCtx = useConditionContext(row);

  const visible = evaluateCondition(schema.visibleIf, conditionCtx, true);
  const enabled = evaluateCondition(schema.enabledIf, conditionCtx, true);

  const Component = useMemo(() => {
    return registry.resolve(schema.type) ?? Fallback;
  }, [Fallback, registry, schema.type]);

  const dispatchWithContext = useCallback(
    (actions: ActionSchema | ActionSchema[]) => {
      return sdui?.dispatchAction(actions, {
        formState: form?.values ?? {},
        setFormField: form?.setField ?? (() => {}),
        row,
      });
    },
    [form, row, sdui],
  );

  const actionProps = useMemo(() => {
    if (!schema.actions) return {};
    const props: Record<string, () => void> = {};
    Object.entries(schema.actions).forEach(([eventName, actionDef]) => {
      props[eventName] = () => {
        void dispatchWithContext(actionDef);
      };
    });
    return props;
  }, [dispatchWithContext, schema.actions]);

  const fieldProps = useMemo(() => {
    if (!schema.name || !form) return {};
    return {
      value: form.values[schema.name],
      error: form.errors[schema.name],
      onChange: (value: unknown) => {
        form.setField(schema.name!, value);
        form.touchField(schema.name!);
        form.validateField(schema.name!);
      },
    };
  }, [form, schema.name]);

  if (!visible) return null;

  const childNodes = schema.children?.map((child, index) => (
    <SchemaNode
      key={child.id ?? `${schema.id}-child-${index}`}
      schema={child}
      registry={registry}
      row={row}
      Fallback={Fallback}
    />
  ));

  const Renderable = Component as React.ComponentType<Record<string, unknown>>;

  return (
    <Renderable
      schema={schema}
      {...schema.props}
      {...fieldProps}
      {...actionProps}
      disabled={!enabled}
      className={schema.className}
      style={schema.style}
      registry={registry}
      row={row}
      sduiContext={sdui}
      formContext={form}
    >
      {childNodes}
    </Renderable>
  );
});
