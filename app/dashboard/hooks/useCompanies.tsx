'use client';

import { useState, useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useIntl } from '@/utils/contexts/intl';
import type { Company } from '../types';
import { INITIAL_COMPANIES } from '../mock/initialCompanies';
import { IconCheck, IconX } from '@tabler/icons-react';

export const useCompanies = () => {
  const intl = useIntl();
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);

  const create = useCallback(
    (data: { inn: number; name?: string }) => {
      setCompanies((prev) => [
        {
          id: String(Date.now()),
          inn: data.inn,
          name: data.name,
          createdAt: new Date()
        },
        ...prev
      ]);

      notifications.show({
        title: intl.formatMessage({ id: 'dashboard.notification.created.title' }),
        message: intl.formatMessage({ id: 'dashboard.notification.created.message' }),
        color: 'teal',
        icon: <IconCheck size={16} />
      });
    },
    [intl]
  );

  const update = useCallback(
    (id: string, data: { inn: number; name?: string }) => {
      setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));

      notifications.show({
        title: intl.formatMessage({ id: 'dashboard.notification.updated.title' }),
        message: intl.formatMessage({ id: 'dashboard.notification.updated.message' }),
        color: 'teal',
        icon: <IconCheck size={16} />
      });
    },
    [intl]
  );

  const remove = useCallback(
    (company: Company) => {
      modals.openConfirmModal({
        centered: true,
        title: intl.formatMessage({ id: 'dashboard.modal.delete.title' }),
        children: intl.formatMessage(
          { id: 'dashboard.modal.delete.message' },
          { name: company.name || company.inn }
        ),
        confirmProps: { color: 'red' },
        onConfirm: () => {
          setCompanies((prev) => prev.filter((c) => c.id !== company.id));
          notifications.show({
            title: intl.formatMessage({ id: 'dashboard.notification.deleted.title' }),
            message: intl.formatMessage({ id: 'dashboard.notification.deleted.message' }),
            color: 'red',
            icon: <IconX size={16} />
          });
        }
      });
    },
    [intl]
  );

  return {
    companies,
    create,
    update,
    remove
  };
};
