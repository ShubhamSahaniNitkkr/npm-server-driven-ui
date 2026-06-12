import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRegistry } from '../src/registry/createRegistry';
import { SDUIRenderer } from '../src/renderer/SDUIRenderer';

describe('SDUIRenderer', () => {
  it('renders registered components from schema', () => {
    const Text = ({ schema }: { schema: { text?: string } }) => <span>{schema.text}</span>;
    const registry = createRegistry({ text: Text as never });

    render(
      <SDUIRenderer
        schema={{ type: 'text', text: 'Hello SDUI' }}
        registry={registry}
      />,
    );

    expect(screen.getByText('Hello SDUI')).toBeTruthy();
  });

  it('hides components when visibleIf is false', () => {
    const Text = ({ schema }: { schema: { text?: string } }) => <span>{schema.text}</span>;
    const registry = createRegistry({ text: Text as never });

    render(
      <SDUIRenderer
        schema={{
          type: 'page',
          children: [
            {
              type: 'text',
              text: 'Hidden',
              visibleIf: { field: 'show', equals: true },
            },
          ],
        }}
        registry={registry}
        context={{ show: false }}
      />,
    );

    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('renders nested children', () => {
    const Container = ({ children }: { children?: React.ReactNode }) => <div data-testid="box">{children}</div>;
    const Text = ({ schema }: { schema: { text?: string } }) => <span>{schema.text}</span>;
    const registry = createRegistry({ box: Container as never, text: Text as never });

    render(
      <SDUIRenderer
        schema={{
          type: 'box',
          children: [{ type: 'text', text: 'Nested' }],
        }}
        registry={registry}
      />,
    );

    expect(screen.getByText('Nested')).toBeTruthy();
  });
});
