'use client';

import { useCallback, useState } from 'react';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useIntl } from '@/utils/contexts/intl';
import type { Snipment } from '../../types';
import { INITIAL_SNIPMENTS } from '../../mock/initialSnipments';
import type { SnipmentFormValues } from './useSnipmentForm';

export const useSnipments = (companyId: string) => {
  const intl = useIntl();
  const [snipments, setSnipments] = useState<Snipment[]>(
    INITIAL_SNIPMENTS.filter((snipment) => snipment.companyId === companyId)
  );

  const create = useCallback(
    (values: SnipmentFormValues) => {
      const newSnipment: Snipment = {
        id: String(Date.now()),
        companyId,
        tons: values.tons,
        mark1: values.mark1,
        mark2: values.mark2,
        date: values.date!,
        createdBy: 'Текущий пользователь',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setSnipments((prev) => [newSnipment, ...prev]);
      notifications.show({
        title: intl.formatMessage({ id: 'company.notification.created.title' }),
        message: intl.formatMessage({ id: 'company.notification.created.message' }),
        color: 'teal',
        icon: <IconCheck size={16} />
      });
    },
    [companyId, intl]
  );

  const update = useCallback(
    (id: string, values: SnipmentFormValues) => {
      setSnipments((prev) =>
        prev.map((snipment) =>
          snipment.id === id
            ? {
                ...snipment,
                tons: values.tons,
                mark1: values.mark1,
                mark2: values.mark2,
                date: values.date!,
                updatedAt: new Date()
              }
            : snipment
        )
      );

      notifications.show({
        title: intl.formatMessage({ id: 'company.notification.updated.title' }),
        message: intl.formatMessage({ id: 'company.notification.updated.message' }),
        color: 'teal',
        icon: <IconCheck size={16} />
      });
    },
    [intl]
  );

  const remove = useCallback(
    (snipment: Snipment) => {
      modals.openConfirmModal({
        title: (
          <Group gap='xs'>
            <IconTrash size={20} color='var(--mantine-color-red-6)' />
            <Text fw={600}>{intl.formatMessage({ id: 'company.modal.delete.title' })}</Text>
          </Group>
        ),
        centered: true,
        children: (
          <Text size='sm'>
            {intl.formatMessage({ id: 'company.modal.delete.message' }, { tons: snipment.tons })}
          </Text>
        ),
        labels: {
          confirm: intl.formatMessage({ id: 'dashboard.modal.delete.confirm' }),
          cancel: intl.formatMessage({ id: 'dashboard.form.cancel' })
        },
        confirmProps: { color: 'red' },
        onConfirm: () => {
          setSnipments((prev) => prev.filter((item) => item.id !== snipment.id));
          notifications.show({
            title: intl.formatMessage({ id: 'company.notification.deleted.title' }),
            message: intl.formatMessage({ id: 'company.notification.deleted.message' }),
            color: 'red',
            icon: <IconX size={16} />
          });
        }
      });
    },
    [intl]
  );

  return {
    snipments,
    create,
    update,
    remove
  };
};
