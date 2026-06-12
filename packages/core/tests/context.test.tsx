import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SDUIProvider, useSDUIContext } from '../src/context/SDUIContext';
import { useAction, useFormState } from '../src/context/hooks';
import { FormProvider } from '../src/forms/FormProvider';

function Probe() {
  const ctx = useSDUIContext();
  const dispatch = useAction();
  const formState = useFormState();

  return (
    <div>
      <span data-testid="theme">{ctx.theme.mode}</span>
      <span data-testid="form">{JSON.stringify(formState)}</span>
      <button
        type="button"
        onClick={() => {
          ctx.openModal('test');
          void dispatch({ type: 'navigate', path: '/x' });
        }}
      >
        Go
      </button>
    </div>
  );
}

describe('SDUIProvider and hooks', () => {
  it('provides theme and dispatches actions', () => {
    const onNavigate = vi.fn();
    render(
      <SDUIProvider theme="dark" onNavigate={onNavigate}>
        <FormProvider validators={new Map()}>
          <Probe />
        </FormProvider>
      </SDUIProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    screen.getByText('Go').click();
    expect(onNavigate).toHaveBeenCalledWith('/x');
  });
});
