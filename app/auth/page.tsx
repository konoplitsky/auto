'use client';

import { Box, Center, Container } from '@mantine/core';
import type { WizardStepId } from './(contexts)/wizard/WizardContext';
import { WizardProvider } from './(contexts)/wizard/WizardProvider';
import { WizardStep } from './(contexts)/wizard/WizardStep';
import { authMap } from './map';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authFormSchema, type AuthFormValues } from './schema';

const AuthPage = () => {
  const initialStepId: WizardStepId = 'role';
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      role: '',
      inn: '',
      login: '',
      password: ''
    }
  });

  return (
    <Box bg="var(--mantine-color-body)" miw="100vw" mih="100vh">
      <Center mih="100vh">
        <Container size={520}>
          <FormProvider {...form}>
            <WizardProvider map={authMap} initialStepId={initialStepId}>
              <WizardStep />
            </WizardProvider>
          </FormProvider>
        </Container>
      </Center>
    </Box>
  );
};

export default AuthPage;
