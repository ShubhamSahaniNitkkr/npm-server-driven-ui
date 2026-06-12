import { describe, expect, it } from 'vitest';
import { evaluateCondition } from '../src/conditions/evaluateCondition';

describe('evaluateCondition', () => {
  const ctx = { role: 'admin', age: 30, email: 'a@b.com' };

  it('returns default when condition is undefined', () => {
    expect(evaluateCondition(undefined, ctx)).toBe(true);
    expect(evaluateCondition(undefined, ctx, false)).toBe(false);
  });

  it('evaluates equals and notEquals', () => {
    expect(evaluateCondition({ field: 'role', equals: 'admin' }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'role', notEquals: 'user' }, ctx)).toBe(true);
  });

  it('evaluates in and notIn', () => {
    expect(evaluateCondition({ field: 'role', in: ['admin', 'user'] }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'role', notIn: ['guest'] }, ctx)).toBe(true);
  });

  it('evaluates numeric comparisons', () => {
    expect(evaluateCondition({ field: 'age', gt: 18 }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'age', gte: 30 }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'age', lt: 40 }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'age', lte: 30 }, ctx)).toBe(true);
  });

  it('evaluates exists', () => {
    expect(evaluateCondition({ field: 'email', exists: true }, ctx)).toBe(true);
    expect(evaluateCondition({ field: 'missing', exists: false }, ctx)).toBe(true);
  });

  it('evaluates and/or/not', () => {
    expect(
      evaluateCondition({ and: [{ field: 'role', equals: 'admin' }, { field: 'age', gte: 18 }] }, ctx),
    ).toBe(true);
    expect(
      evaluateCondition({ or: [{ field: 'role', equals: 'guest' }, { field: 'age', gte: 18 }] }, ctx),
    ).toBe(true);
    expect(evaluateCondition({ not: { field: 'role', equals: 'guest' } }, ctx)).toBe(true);
  });

  it('supports nested field paths', () => {
    expect(evaluateCondition({ field: 'user.role', equals: 'admin' }, { user: { role: 'admin' } })).toBe(true);
  });
});
