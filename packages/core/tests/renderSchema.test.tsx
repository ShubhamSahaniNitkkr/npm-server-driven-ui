import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { createRegistry } from '../src/registry/createRegistry';
import { renderSchema } from '../src/renderer/renderSchema';

describe('renderSchema', () => {
  it('returns a React element', () => {
    const Text = ({ schema }: { schema: { text?: string } }) => createElement('span', null, schema.text);
    const registry = createRegistry({ text: Text as never });
    const element = renderSchema({ type: 'text', text: 'Hello' }, { registry });
    expect(element).toBeTruthy();
    expect(element.props.schema.text).toBe('Hello');
  });
});
