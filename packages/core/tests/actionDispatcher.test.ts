import { describe, expect, it, vi } from 'vitest';
import { createActionDispatcher } from '../src/actions/createActionDispatcher';
import { createActionRegistry } from '../src/actions/registerAction';
import { createBuiltInActions } from '../src/actions/builtInActions';
import type { ActionContext } from '../src/actions/types';

describe('createActionDispatcher', () => {
  const ctx: ActionContext = {
    formState: {},
    context: {},
    setFormField: vi.fn(),
    openModal: vi.fn(),
    closeModal: vi.fn(),
  };

  it('runs built-in actions', async () => {
    const onNavigate = vi.fn();
    const builtIn = createBuiltInActions({ navigate: onNavigate });
    const dispatch = createActionDispatcher({
      registry: createActionRegistry(),
      builtIn,
    });

    await dispatch({ type: 'navigate', path: '/home' }, ctx);
    expect(onNavigate).toHaveBeenCalledWith('/home');
  });

  it('runs custom actions', async () => {
    const registry = createActionRegistry();
    const handler = vi.fn();
    registry.register('myAction', handler);

    const dispatch = createActionDispatcher({
      registry,
      builtIn: {},
    });

    await dispatch({ type: 'customAction', name: 'myAction' }, ctx);
    expect(handler).toHaveBeenCalled();
  });

  it('chains onSuccess actions', async () => {
    const onNavigate = vi.fn();
    const builtIn = createBuiltInActions({ navigate: onNavigate });
    const dispatch = createActionDispatcher({
      registry: createActionRegistry(),
      builtIn,
    });

    await dispatch(
      {
        type: 'onClick',
        onSuccess: { type: 'navigate', path: '/done' },
      },
      ctx,
    );
    expect(onNavigate).toHaveBeenCalledWith('/done');
  });

  it('calls onAction callback', async () => {
    const onAction = vi.fn();
    const dispatch = createActionDispatcher({
      registry: createActionRegistry(),
      builtIn: createBuiltInActions({}),
      onAction,
    });

    await dispatch({ type: 'setField', field: 'x', value: 1 }, ctx);
    expect(onAction).toHaveBeenCalled();
  });
});
