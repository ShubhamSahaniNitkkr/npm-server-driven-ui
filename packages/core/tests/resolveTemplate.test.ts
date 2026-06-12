import { describe, expect, it } from 'vitest';
import { resolveDataSource, resolveTemplateValue } from '../src/utils/resolveTemplate';

describe('resolveTemplate', () => {
  it('resolves template strings from context', () => {
    expect(resolveTemplateValue('{{users}}', { users: [{ id: 1 }] })).toEqual([{ id: 1 }]);
    expect(resolveTemplateValue('plain', {})).toBe('plain');
  });

  it('resolves dataSource arrays', () => {
    expect(resolveDataSource('{{items}}', { items: [1, 2] })).toEqual([1, 2]);
    expect(resolveDataSource([1, 2], {})).toEqual([1, 2]);
    expect(resolveDataSource(undefined, {})).toEqual([]);
  });
});
