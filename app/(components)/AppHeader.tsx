'use client';

import { ActionIcon, Box, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useIntl } from '@/utils/contexts/intl';
import { LanguageSwitcher } from '@/app/(components)/LanguageSwitcher';

export const AppHeader = () => {
  const intl = useIntl();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box pos='fixed' top={16} right={16} style={{ zIndex: 10 }}>
      <Group gap={4}>
        <LanguageSwitcher />

        <ActionIcon
          variant='subtle'
          size='lg'
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label={intl.formatMessage({ id: 'theme.toggle' })}
        >
          <span suppressHydrationWarning>
            {mounted && (resolvedTheme === 'dark' ? <IconMoon size={18} /> : <IconSun size={18} />)}
          </span>
        </ActionIcon>
      </Group>
    </Box>
  );
};
