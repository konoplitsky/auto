import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useIntl } from '@/utils/contexts/intl';
import type { Snipment } from '../../types';
import { SnipmentFormModal } from '../(components)/SnipmentFormModal';

export type SnipmentFormValues = {
  tons: string;
  mark1: string;
  mark2: string;
  date: Date | null;
};

export const useSnipmentForm = ({
  onCreate,
  onUpdate
}: {
  onCreate: (data: SnipmentFormValues) => void;
  onUpdate: (id: string, data: SnipmentFormValues) => void;
}) => {
  const intl = useIntl();

  const form = useForm<SnipmentFormValues>({
    initialValues: {
      tons: '',
      mark1: '',
      mark2: '',
      date: null
    },
    validate: {
      tons: (value) =>
        !value ? intl.formatMessage({ id: 'company.form.validation.required' }) : null,
      date: (value) =>
        !value ? intl.formatMessage({ id: 'company.form.validation.required' }) : null
    }
  });

  const open = (snipment?: Snipment) => {
    const isEdit = Boolean(snipment);

    if (snipment) {
      form.setValues({
        tons: snipment.tons,
        mark1: snipment.mark1,
        mark2: snipment.mark2,
        date: snipment.date
      });
    } else {
      form.reset();
    }

    modals.open({
      centered: true,
      title: intl.formatMessage({
        id: isEdit ? 'company.modal.edit.title' : 'company.modal.create.title'
      }),
      children: (
        <SnipmentFormModal
          form={form}
          isEdit={isEdit}
          onSubmit={(values) => {
            if (isEdit && snipment) {
              onUpdate(snipment.id, values);
            } else {
              onCreate(values);
            }
            modals.closeAll();
          }}
        />
      )
    });
  };

  return {
    openCreate: () => open(),
    openEdit: (snipment: Snipment) => open(snipment)
  };
};
