import { createElement } from 'react';
import type { ComponentRegistry } from '../registry/types';
import type { SDUISchema } from '../schema/types';
import type { SDUIRendererProps } from './SDUIRenderer';
import { SDUIRenderer } from './SDUIRenderer';

export interface RenderSchemaOptions extends Omit<SDUIRendererProps, 'schema'> {
  registry: ComponentRegistry;
}

export function renderSchema(schema: SDUISchema | SDUISchema[], options: RenderSchemaOptions) {
  return createElement(SDUIRenderer, { schema, ...options });
}
