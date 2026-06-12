import { describe, expect, it } from 'vitest';
import { normalizeSchema } from '../src/schema/normalizeSchema';

describe('normalizeSchema', () => {
  it('assigns ids to schema nodes', () => {
    const result = normalizeSchema({
      type: 'page',
      children: [{ type: 'text', text: 'Hi' }],
    });

    expect(result).toHaveProperty('id');
    if (!Array.isArray(result) && result.children?.[0]) {
      expect(result.children[0].id).toBeDefined();
    }
  });

  it('normalizes schema arrays', () => {
    const result = normalizeSchema([{ type: 'text', text: 'A' }, { type: 'text', text: 'B' }]);
    expect(Array.isArray(result)).toBe(true);
    expect((result as { id: string }[])[0].id).toBeDefined();
  });
});
