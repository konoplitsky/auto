import { Button, Group, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { useIntl } from '@/utils/contexts/intl';
import type { UseFormReturnType } from '@mantine/form';
import type { SnipmentFormValues } from '../hooks/useSnipmentForm';

interface SnipmentFormModalProps {
  form: UseFormReturnType<SnipmentFormValues>;
  isEdit: boolean;
  onSubmit: (values: SnipmentFormValues) => void;
}

export const SnipmentFormModal = ({ form, isEdit, onSubmit }: SnipmentFormModalProps) => {
  const intl = useIntl();

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap='md'>
        <TextInput
          label={intl.formatMessage({ id: 'company.form.tons' })}
          placeholder={intl.formatMessage({ id: 'company.form.tons.placeholder' })}
          {...form.getInputProps('tons')}
        />
        <TextInput
          label={intl.formatMessage({ id: 'company.form.mark1' })}
          placeholder={intl.formatMessage({ id: 'company.form.mark1.placeholder' })}
          {...form.getInputProps('mark1')}
        />
        <TextInput
          label={intl.formatMessage({ id: 'company.form.mark2' })}
          placeholder={intl.formatMessage({ id: 'company.form.mark2.placeholder' })}
          {...form.getInputProps('mark2')}
        />
        <DatePickerInput
          label={intl.formatMessage({ id: 'company.form.date' })}
          placeholder={intl.formatMessage({ id: 'company.form.date.placeholder' })}
          valueFormat='DD.MM.YYYY'
          {...form.getInputProps('date')}
        />
        <Group justify='flex-end' mt='md'>
          <Button variant='default' onClick={() => modals.closeAll()}>
            {intl.formatMessage({ id: 'dashboard.form.cancel' })}
          </Button>
          <Button type='submit'>
            {intl.formatMessage({
              id: isEdit ? 'dashboard.form.save' : 'dashboard.form.create'
            })}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
