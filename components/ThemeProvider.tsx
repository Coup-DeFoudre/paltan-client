/**
 * @fileoverview Theme provider component for Paltan Client
 * @description Wrapper component for next-themes to enable theme switching functionality
 */

'use client';

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Props type for ThemeProvider component
 * @typedef {React.ComponentProps<typeof NextThemesProvider>} ThemeProviderProps
 */
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Theme provider component that wraps the application with theme context
 * @param {ThemeProviderProps} props - Props passed to the next-themes provider
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {React.ReactElement} The theme provider wrapper
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
