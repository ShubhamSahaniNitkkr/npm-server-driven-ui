import type { ConditionSchema } from './types';

function getFieldValue(ctx: Record<string, unknown>, field: string): unknown {
  return field.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, ctx);
}

export function evaluateCondition(
  condition: ConditionSchema | undefined,
  ctx: Record<string, unknown>,
  defaultValue = true,
): boolean {
  if (!condition) return defaultValue;

  if ('and' in condition) {
    return condition.and.every((c) => evaluateCondition(c, ctx, defaultValue));
  }
  if ('or' in condition) {
    return condition.or.some((c) => evaluateCondition(c, ctx, defaultValue));
  }
  if ('not' in condition) {
    return !evaluateCondition(condition.not, ctx, defaultValue);
  }

  const value = getFieldValue(ctx, condition.field);

  if ('equals' in condition) return value === condition.equals;
  if ('notEquals' in condition) return value !== condition.notEquals;
  if ('in' in condition) return condition.in.includes(value);
  if ('notIn' in condition) return !condition.notIn.includes(value);
  if ('gt' in condition) return typeof value === 'number' && value > condition.gt;
  if ('gte' in condition) return typeof value === 'number' && value >= condition.gte;
  if ('lt' in condition) return typeof value === 'number' && value < condition.lt;
  if ('lte' in condition) return typeof value === 'number' && value <= condition.lte;
  if ('exists' in condition) {
    const exists = value !== undefined && value !== null && value !== '';
    return condition.exists ? exists : !exists;
  }

  return defaultValue;
}
