export function resolveTemplateValue(
  value: unknown,
  ctx: Record<string, unknown>,
): unknown {
  if (typeof value !== 'string') return value;
  if (!value.startsWith('{{') || !value.endsWith('}}')) return value;

  const path = value.slice(2, -2).trim();
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, ctx);
}

export function resolveDataSource(
  dataSource: string | unknown[] | undefined,
  ctx: Record<string, unknown>,
): unknown[] {
  if (Array.isArray(dataSource)) return dataSource;
  if (!dataSource) return [];
  const resolved = resolveTemplateValue(dataSource, ctx);
  return Array.isArray(resolved) ? resolved : [];
}
