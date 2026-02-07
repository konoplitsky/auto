import { Text, ActionIcon, Menu } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import type { Company } from '../types';
import { translateCompanyName } from '@/utils/helpers/translateCompanyType';
import type { DataTableColumn } from 'mantine-datatable';

export const useCompanyColumns = (
  intl: any,
  openEdit: (company: Company) => void,
  remove: (company: Company) => void
): DataTableColumn<Company>[] => [
  {
    accessor: 'inn',
    title: intl.formatMessage({ id: 'dashboard.table.inn' }),
    render: (record) => (
      <Text fw={500} ff='monospace'>
        {record.inn}
      </Text>
    )
  },
  {
    accessor: 'name',
    title: intl.formatMessage({ id: 'dashboard.table.name' }),
    render: (record) => {
      const translatedName = translateCompanyName(record.name, intl.locale);
      return <Text c={translatedName ? undefined : 'dimmed'}>{translatedName || '—'}</Text>;
    }
  },
  {
    accessor: 'actions',
    title: '',
    width: 50,
    textAlign: 'center',
    render: (record) => (
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
              openEdit(record);
            }}
          >
            {intl.formatMessage({ id: 'dashboard.action.edit' })}
          </Menu.Item>

          <Menu.Item
            color='red'
            leftSection={<IconTrash size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              remove(record);
            }}
          >
            {intl.formatMessage({ id: 'dashboard.action.delete' })}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }
];
