import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createRegistry } from '../src/registry/createRegistry';
import { SDUIRenderer } from '../src/renderer/SDUIRenderer';

describe('forms', () => {
  it('binds form field values', () => {
    const Input = ({
      schema,
      value,
      onChange,
    }: {
      schema: { label?: string };
      value?: string;
      onChange?: (v: string) => void;
    }) => (
      <label>
        {schema.label}
        <input aria-label={schema.label} value={(value as string) ?? ''} onChange={(e) => onChange?.(e.target.value)} />
      </label>
    );

    const registry = createRegistry({ input: Input as never });

    render(
      <SDUIRenderer
        schema={{ type: 'input', name: 'email', label: 'Email' }}
        registry={registry}
      />,
    );

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect((input as HTMLInputElement).value).toBe('test@example.com');
  });
});
