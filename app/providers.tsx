'use client';

import { ComponentProps, ReactNode } from 'react';
import { ThemeProvider } from '@/utils/contexts/theme';
import { IntlProvider } from '@/utils/contexts/intl';

interface ProvidersProps {
  children: ReactNode;
  intl: Omit<ComponentProps<typeof IntlProvider>, 'children'>;
}

export const Providers = ({ children, intl }: ProvidersProps) => (
  <IntlProvider {...intl}>
    <ThemeProvider>{children}</ThemeProvider>
  </IntlProvider>
);
