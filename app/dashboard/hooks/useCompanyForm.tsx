import { useForm, zodResolver } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useIntl } from '@/utils/contexts/intl';
import type { Company } from '../types';
import { CompanyFormModal } from '@/app/dashboard/(compoentns)/CompanyFormModal';
import { z } from 'zod';

export const companyFormSchema = z.object({
  inn: z
    .number({
      required_error: 'required',
      invalid_type_error: 'required'
    })
    .int()
    .positive(),
  name: z.string().trim().min(1).optional()
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const useCompanyForm = ({
  onCreate,
  onUpdate
}: {
  onCreate: (data: CompanyFormValues) => void;
  onUpdate: (id: string, data: CompanyFormValues) => void;
}) => {
  const intl = useIntl();

  const form = useForm<CompanyFormValues>({
    initialValues: {
      inn: 0,
      name: ''
    },
    validate: zodResolver(companyFormSchema),
    transformValues: (values) => ({
      ...values,
      name: values.name || undefined
    })
  });

  const open = (company?: Company) => {
    const isEdit = Boolean(company);

    if (company) {
      form.setValues({
        inn: company.inn,
        name: company.name ?? ''
      });
    } else {
      form.reset();
    }

    modals.open({
      centered: true,
      title: intl.formatMessage({
        id: isEdit ? 'dashboard.modal.edit.title' : 'dashboard.modal.create.title'
      }),
      children: (
        <CompanyFormModal
          form={form}
          isEdit={isEdit}
          onSubmit={(values) => {
            if (isEdit && company) {
              onUpdate(company.id, values);
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
    openEdit: (company: Company) => open(company)
  };
};
