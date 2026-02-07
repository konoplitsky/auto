import { ActionIcon, Menu, Text } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { Snipment } from '../../types';

export const useSnipmentColumns = (
  intl: any,
  openEdit: (snipment: Snipment) => void,
  remove: (snipment: Snipment) => void
): DataTableColumn<Snipment>[] => [
  {
    accessor: 'date',
    title: intl.formatMessage({ id: 'company.table.date' }),
    render: ({ date }) => (
      <Text>
        {date
          .toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
          .replace(/\//g, '.')}
      </Text>
    )
  },
  {
    accessor: 'tons',
    title: intl.formatMessage({ id: 'company.table.tons' }),
    render: ({ tons }) => <Text fw={500}>{tons} т</Text>
  },
  {
    accessor: 'mark1',
    title: intl.formatMessage({ id: 'company.table.mark1' }),
    render: ({ mark1 }) => <Text>{mark1 || '—'}</Text>
  },
  {
    accessor: 'mark2',
    title: intl.formatMessage({ id: 'company.table.mark2' }),
    render: ({ mark2 }) => <Text>{mark2 || '—'}</Text>
  },
  {
    accessor: 'createdBy',
    title: intl.formatMessage({ id: 'company.table.createdBy' }),
    render: ({ createdBy }) => <Text c='dimmed'>{createdBy}</Text>
  },
  {
    accessor: 'actions',
    title: '',
    width: 50,
    textAlign: 'center',
    render: (snipment) => (
      <Menu position='bottom-end' withArrow shadow='md'>
        <Menu.Target>
          <ActionIcon variant='subtle' color='gray' onClick={(e) => e.stopPropagation()}>
            <IconDotsVertical size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              openEdit(snipment);
            }}
          >
            {intl.formatMessage({ id: 'dashboard.action.edit' })}
          </Menu.Item>
          <Menu.Item
            color='red'
            leftSection={<IconTrash size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              remove(snipment);
            }}
          >
            {intl.formatMessage({ id: 'dashboard.action.delete' })}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }
];
