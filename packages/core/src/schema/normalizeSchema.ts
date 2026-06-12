import type { SDUISchema } from './types';

let idCounter = 0;

function assignIds(schema: SDUISchema, prefix = 'node'): SDUISchema {
  const id = schema.id ?? `${prefix}-${++idCounter}`;
  const children = schema.children?.map((child, index) => assignIds(child, `${id}-${index}`));

  return {
    ...schema,
    id,
    children,
  };
}

export function normalizeSchema(schema: SDUISchema | SDUISchema[]): SDUISchema | SDUISchema[] {
  idCounter = 0;
  if (Array.isArray(schema)) {
    return schema.map((item, index) => assignIds(item, `root-${index}`));
  }
  return assignIds(schema);
}
