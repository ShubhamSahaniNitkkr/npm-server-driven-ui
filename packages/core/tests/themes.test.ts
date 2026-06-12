import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme, resolveTheme } from '../src/theme/themes';

describe('themes', () => {
  it('resolves light and dark presets', () => {
    expect(resolveTheme('light')).toEqual(lightTheme);
    expect(resolveTheme('dark')).toEqual(darkTheme);
  });

  it('merges custom theme', () => {
    expect(resolveTheme({ mode: 'dark', primaryColor: '#000' }).primaryColor).toBe('#000');
  });
});
