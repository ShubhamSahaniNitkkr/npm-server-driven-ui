import { describe, expect, it } from 'vitest';
import {
  createRegistry,
  mergeRegistries,
  registerComponent,
  unregisterComponent,
} from '../src/registry/createRegistry';

describe('registry', () => {
  it('creates and resolves components', () => {
    const Mock = () => null;
    const registry = createRegistry({ button: Mock });
    expect(registry.has('button')).toBe(true);
    expect(registry.resolve('button')).toBe(Mock);
    expect(registry.list()).toContain('button');
  });

  it('registers and unregisters components', () => {
    const registry = createRegistry();
    const Mock = () => null;
    registerComponent('custom', Mock, registry);
    expect(registry.has('custom')).toBe(true);
    unregisterComponent('custom', registry);
    expect(registry.has('custom')).toBe(false);
  });

  it('merges registries with override', () => {
    const A = () => null;
    const B = () => null;
    const regA = createRegistry({ item: A });
    const regB = createRegistry({ item: B });
    const merged = mergeRegistries(regA, regB);
    expect(merged.resolve('item')).toBe(B);
  });
});
