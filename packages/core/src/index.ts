export { SDUIRenderer } from './renderer/SDUIRenderer';
export type { SDUIRendererProps } from './renderer/SDUIRenderer';
export { renderSchema } from './renderer/renderSchema';
export type { RenderSchemaOptions } from './renderer/renderSchema';
export { SchemaNode } from './renderer/SchemaNode';
export { FallbackComponent } from './renderer/FallbackComponent';

export {
  createRegistry,
  registerComponent,
  unregisterComponent,
  mergeRegistries,
} from './registry/createRegistry';
export type { ComponentRegistry, RegistryEntry, SDUIComponent } from './registry/types';

export { registerAction, createActionRegistry } from './actions/registerAction';
export { createActionDispatcher } from './actions/createActionDispatcher';
export { createBuiltInActions } from './actions/builtInActions';
export type {
  ActionHandler,
  ActionContext,
  ActionSchema,
  ActionRegistry,
  ActionType,
} from './actions/types';

export { registerValidator, createValidatorRegistry } from './validation/registerValidator';
export { builtInValidators, validateWithRules } from './validation/builtInValidators';
export type { ValidatorFn, ValidationRule, ValidatorRegistry } from './validation/types';

export type {
  SDUISchema,
  PageSchema,
  BaseSchema,
  FormFieldSchema,
  TableSchema,
  TableColumnSchema,
  ChartSchema,
  ChartSeriesSchema,
  ModalSchema,
  ThemeConfig,
} from './schema/types';
export { normalizeSchema } from './schema/normalizeSchema';

export { evaluateCondition } from './conditions/evaluateCondition';
export type { ConditionSchema } from './conditions/types';

export { SDUIProvider } from './context/SDUIContext';
export type { SDUIProviderProps } from './context/SDUIContext';
export { useSDUIContext, useOptionalSDUIContext, useAction, useFormState } from './context/hooks';
export { useFormContext, useOptionalFormContext } from './forms/FormProvider';

export { lightTheme, darkTheme, resolveTheme } from './theme/themes';
export { resolveTemplateValue, resolveDataSource } from './utils/resolveTemplate';
