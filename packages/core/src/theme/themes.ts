import type { ThemeConfig } from '../schema/types';

export const lightTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#1677ff',
  borderRadius: 6,
};

export const darkTheme: ThemeConfig = {
  mode: 'dark',
  primaryColor: '#1668dc',
  borderRadius: 6,
};

export function resolveTheme(theme?: ThemeConfig | 'light' | 'dark'): ThemeConfig {
  if (!theme || theme === 'light') return lightTheme;
  if (theme === 'dark') return darkTheme;
  return { ...lightTheme, ...theme };
}
