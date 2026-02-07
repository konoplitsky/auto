'use client';

import { Button, Card, Group, Radio, Stack, Text, Title } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { useWizard } from '../../(contexts)/wizard/useWizard';
import { useIntl } from '@/utils/contexts/intl';
import type { AuthFormValues } from '../../schema';

export const RoleStep = () => {
  const intl = useIntl();
  const { setStepId } = useWizard();
  const { control, watch } = useFormContext<AuthFormValues>();
  const role = watch('role');

  return (
    <Card withBorder radius='lg' p='xl' shadow='sm'>
      <Stack gap='xl'>
        <Stack gap={4}>
          <Title order={2}>{intl.formatMessage({ id: 'auth.title' })}</Title>
          <Text c='dimmed' size='sm'>
            {intl.formatMessage({ id: 'auth.subtitle' })}
          </Text>
        </Stack>

        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <Radio.Group
              value={field.value}
              onChange={field.onChange}
              label={intl.formatMessage({ id: 'auth.label.role' })}
              withAsterisk
            >
              <Stack mt='sm'>
                <Card withBorder radius='md' p='md'>
                  <Group align='flex-start' gap='sm' wrap='nowrap'>
                    <Radio value='guest' label={intl.formatMessage({ id: 'auth.role.guest' })} />
                    <Text size='sm' c='dimmed'>
                      {intl.formatMessage({ id: 'auth.role.guest.desc' })}
                    </Text>
                  </Group>
                </Card>
                <Card withBorder radius='md' p='md'>
                  <Group align='flex-start' gap='sm' wrap='nowrap'>
                    <Radio
                      value='employee'
                      label={intl.formatMessage({ id: 'auth.role.employee' })}
                    />
                    <Text size='sm' c='dimmed'>
                      {intl.formatMessage({ id: 'auth.role.employee.desc' })}
                    </Text>
                  </Group>
                </Card>
              </Stack>
            </Radio.Group>
          )}
        />

        <Group justify='space-between'>
          <Button variant='light' disabled>
            {intl.formatMessage({ id: 'auth.button.back' })}
          </Button>
          <Button onClick={() => setStepId('details')} disabled={!role}>
            {intl.formatMessage({ id: 'auth.button.next' })}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
