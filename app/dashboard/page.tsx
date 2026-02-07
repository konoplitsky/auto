'use client';

import { Box, Button, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { useIntl } from '@/utils/contexts/intl';

import { DashboardPageShell } from '@/app/dashboard/(compoentns)/DashboardPageShell';
import { useCompanies } from './hooks/useCompanies';
import { useCompanyForm } from './hooks/useCompanyForm';
import { useCompanyTable } from './hooks/useCompanyTable';
import { useCompanyColumns } from '@/app/dashboard/hooks/useComanyColumns';

const PAGE_SIZE = 10;

const DashboardPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const { companies, create, update, remove } = useCompanies();

  const { openCreate, openEdit } = useCompanyForm({
    onCreate: create,
    onUpdate: update
  });

  const { records, total, paginate, search } = useCompanyTable({
    companies,
    pageSize: PAGE_SIZE
  });

  return (
    <DashboardPageShell>
      <Stack gap='md'>
        <Group justify='space-between' align='flex-start'>
          <Box>
            <Title order={2} c='teal'>
              {intl.formatMessage({ id: 'dashboard.title' })}
            </Title>
            <Text c='dimmed' size='sm' mt={4}>
              {intl.formatMessage({ id: 'dashboard.subtitle' }, { count: total })}
            </Text>
          </Box>

          <Button
            leftSection={<IconPlus size={18} />}
            gradient={{ from: 'cyan', to: 'teal', deg: 90 }}
            variant='gradient'
            onClick={openCreate}
          >
            {intl.formatMessage({ id: 'dashboard.button.create' })}
          </Button>
        </Group>

        <TextInput
          placeholder={intl.formatMessage({ id: 'dashboard.search.placeholder' })}
          leftSection={<IconSearch size={18} />}
          value={search.searchQuery}
          onChange={(e) => {
            search.setSearchQuery(e.currentTarget.value);
            paginate.setPage(1);
          }}
          radius='md'
          size='md'
        />

        <DataTable
          minHeight={300}
          withTableBorder
          borderRadius='md'
          highlightOnHover
          striped
          verticalAlign='center'
          records={records}
          totalRecords={total}
          recordsPerPage={PAGE_SIZE}
          page={paginate.page}
          onPageChange={paginate.setPage}
          noRecordsText={intl.formatMessage({ id: 'dashboard.table.empty' })}
          paginationText={() => ''}
          onRowClick={({ record }) => router.push(`/dashboard/${record.id}`)}
          rowStyle={() => ({ cursor: 'pointer' })}
          columns={useCompanyColumns(intl, openEdit, remove)}
        />
      </Stack>
    </DashboardPageShell>
  );
};

export default DashboardPage;
