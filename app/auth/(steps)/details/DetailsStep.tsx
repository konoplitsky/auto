'use client';

import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  PasswordInput,
  Autocomplete
} from '@mantine/core';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useWizard } from '../../(contexts)/wizard/useWizard';
import { useIntl } from '@/utils/contexts/intl';
import { translateCompanyName } from '@/utils/helpers/translateCompanyType';
import type { AuthFormValues } from '../../schema';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const MOCK_COMPANIES = [
  { id: '1', inn: '1234567890', name: 'ООО Ромашка' },
  { id: '2', inn: '9876543210', name: 'АО Василёк' },
  { id: '3', inn: '5555555555', name: '' },
  { id: '4', inn: '1111111111', name: 'ИП Иванов' },
  { id: '5', inn: '2222222222', name: '' },
  { id: '6', inn: '3333333333', name: 'ООО Логистика' },
  { id: '7', inn: '4444444444', name: 'ЗАО Транспорт' },
  { id: '8', inn: '6666666666', name: '' },
  { id: '9', inn: '7777777777', name: 'ООО Перевозки' },
  { id: '10', inn: '8888888888', name: '' },
  { id: '11', inn: '9999999999', name: 'АО Грузовик' },
  { id: '12', inn: '1010101010', name: 'ИП Петров' }
];

export const DetailsStep = () => {
  const intl = useIntl();
  console.log('useIntl', useIntl());
  const { setStepId } = useWizard();
  const { control, handleSubmit } = useFormContext<AuthFormValues>();
  const role = useWatch({ control, name: 'role' });
  const router = useRouter();

  const innOptions = useMemo(() => {
    return MOCK_COMPANIES.map((c) => {
      const translatedName = translateCompanyName(c.name, intl.locale);
      return translatedName ? `${c.inn} — ${translatedName}` : c.inn;
    });
  }, [intl.locale]);

  const onSubmit = handleSubmit((data) => {
    if (role === 'guest' && data.inn) {
      const company = MOCK_COMPANIES.find((c) => c.inn === data.inn);
      if (company) {
        router.push(`/dashboard/${company.id}`);
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  });

  return (
    <Card withBorder radius='lg' p='xl' shadow='sm'>
      <Stack gap='xl'>
        <Stack gap={4}>
          <Title order={2}>{intl.formatMessage({ id: 'auth.button.back' })}</Title>
          <Text c='dimmed' size='sm'>
            {intl.formatMessage({ id: 'auth.subtitle' })}
          </Text>
        </Stack>

        {role === 'guest' ? (
          <Controller
            name='inn'
            control={control}
            render={({ field }) => (
              <Autocomplete
                label={intl.formatMessage({ id: 'auth.label.inn' })}
                placeholder={intl.formatMessage({ id: 'auth.placeholder.inn' })}
                data={innOptions}
                value={field.value}
                onChange={(value) => {
                  const inn = value.split(' — ')[0];
                  field.onChange(inn);
                }}
                limit={10}
              />
            )}
          />
        ) : role === 'employee' ? (
          <Stack>
            <Controller
              name='login'
              control={control}
              render={({ field }) => (
                <TextInput
                  label={intl.formatMessage({ id: 'auth.label.login' })}
                  placeholder={intl.formatMessage({ id: 'auth.placeholder.login' })}
                  {...field}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label={intl.formatMessage({ id: 'auth.label.password' })}
                  placeholder={intl.formatMessage({ id: 'auth.placeholder.password' })}
                  {...field}
                />
              )}
            />
          </Stack>
        ) : (
          <Text c='dimmed'>{intl.formatMessage({ id: 'auth.helper.chooseRoleFirst' })}</Text>
        )}

        <Group justify='space-between'>
          <Button variant='light' onClick={() => setStepId('role')}>
            {intl.formatMessage({ id: 'auth.button.back' })}
          </Button>
          <Button type='button' onClick={onSubmit}>
            {intl.formatMessage({ id: 'auth.button.submit' })}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
