import { Button, Group, Stack, TextInput, NumberInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useIntl } from '@/utils/contexts/intl';
import { UseFormReturnType } from '@mantine/form';
import { CompanyFormValues } from '../hooks/useCompanyForm';

interface CompanyFormModalProps {
  form: UseFormReturnType<CompanyFormValues>;
  isEdit: boolean;
  onSubmit: (values: CompanyFormValues) => void;
}

export const CompanyFormModal = ({ form, isEdit, onSubmit }: CompanyFormModalProps) => {
  const intl = useIntl();

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <NumberInput
          label={intl.formatMessage({ id: 'dashboard.form.inn' })}
          hideControls
          {...form.getInputProps('inn')}
        />

        <TextInput
          label={intl.formatMessage({ id: 'dashboard.form.name' })}
          {...form.getInputProps('name')}
        />

        <Group justify='flex-end'>
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
