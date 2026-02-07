import type { ReactNode } from 'react';
import { Box, Paper } from '@mantine/core';

interface DashboardPageShellProps {
  children: ReactNode;
}

export const DashboardPageShell = ({ children }: DashboardPageShellProps) => (
  <Box p='md' pt={60} mih='100vh'>
    <Paper radius='lg' p='lg' shadow='sm' withBorder maw={1200} mx='auto'>
      {children}
    </Paper>
  </Box>
);
