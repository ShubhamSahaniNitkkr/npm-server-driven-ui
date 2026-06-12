import { describe, expect, it, vi } from 'vitest';
import { createBuiltInActions } from '../src/actions/builtInActions';
import type { ActionContext } from '../src/actions/types';

describe('builtInActions', () => {
  const baseCtx: ActionContext = {
    formState: { name: 'John' },
    context: {},
    setFormField: vi.fn(),
    openModal: vi.fn(),
    closeModal: vi.fn(),
  };

  it('navigates with template resolution', () => {
    const navigate = vi.fn();
    const actions = createBuiltInActions({ navigate });
    actions.navigate({ type: 'navigate', path: '/users/{{name}}' }, baseCtx);
    expect(navigate).toHaveBeenCalledWith('/users/John');
  });

  it('opens and closes modals', () => {
    const actions = createBuiltInActions({});
    actions.openModal({ type: 'openModal', modalId: 'edit' }, baseCtx);
    expect(baseCtx.openModal).toHaveBeenCalledWith('edit', undefined);
    actions.closeModal({ type: 'closeModal', modalId: 'edit' }, baseCtx);
    expect(baseCtx.closeModal).toHaveBeenCalledWith('edit');
  });

  it('sets form fields', () => {
    const actions = createBuiltInActions({});
    actions.setField({ type: 'setField', field: 'role', value: 'admin' }, baseCtx);
    expect(baseCtx.setFormField).toHaveBeenCalledWith('role', 'admin');
  });
});
