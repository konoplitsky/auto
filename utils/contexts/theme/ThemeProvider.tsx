'use client';

import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

const MantineBridge = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <MantineProvider defaultColorScheme='light' forceColorScheme={colorScheme}>
      <ModalsProvider>
        <Notifications position='top-right' />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute='data-mantine-color-scheme'
    defaultTheme='light'
    enableSystem={false}
  >
    <MantineBridge>{children}</MantineBridge>
  </NextThemesProvider>
);
