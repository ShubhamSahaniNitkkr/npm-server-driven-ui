export type ConditionSchema =
  | { field: string; equals: unknown }
  | { field: string; notEquals: unknown }
  | { field: string; in: unknown[] }
  | { field: string; notIn: unknown[] }
  | { field: string; gt: number }
  | { field: string; gte: number }
  | { field: string; lt: number }
  | { field: string; lte: number }
  | { field: string; exists: boolean }
  | { and: ConditionSchema[] }
  | { or: ConditionSchema[] }
  | { not: ConditionSchema };
