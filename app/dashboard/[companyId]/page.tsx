'use client';

import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconArrowLeft, IconPlus, IconSearch } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useIntl } from '@/utils/contexts/intl';
import { translateCompanyName } from '@/utils/helpers/translateCompanyType';
import { DashboardPageShell } from '@/app/dashboard/(compoentns)/DashboardPageShell';
import { useSnipments } from './hooks/useSnipments';
import { useSnipmentForm } from './hooks/useSnipmentForm';
import { useSnipmentTable } from './hooks/useSnipmentTable';
import { useSnipmentColumns } from './hooks/useSnipmentColumns';
import { INITIAL_COMPANIES } from '../mock/initialCompanies';

const PAGE_SIZE = 10;

const CompanyPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;

  const company = INITIAL_COMPANIES.find((item) => item.id === companyId);
  const companyName = translateCompanyName(company?.name, intl.locale);

  const { snipments, create, update, remove } = useSnipments(companyId);
  const { openCreate, openEdit } = useSnipmentForm({
    onCreate: create,
    onUpdate: update
  });
  const { records, total, paginate, search } = useSnipmentTable({
    snipments,
    pageSize: PAGE_SIZE
  });

  if (!company) {
    return (
      <DashboardPageShell>
        <Text c='dimmed'>{intl.formatMessage({ id: 'company.notFound' })}</Text>
        <Button
          mt='md'
          variant='light'
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.push('/dashboard')}
        >
          {intl.formatMessage({ id: 'company.back' })}
        </Button>
      </DashboardPageShell>
    );
  }

  return (
    <DashboardPageShell>
      <Stack gap='md'>
        <Breadcrumbs>
          <Anchor onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer' }}>
            {intl.formatMessage({ id: 'dashboard.title' })}
          </Anchor>
          <Text>{companyName || company.inn}</Text>
        </Breadcrumbs>

        <Group justify='space-between' align='flex-start'>
          <Box>
            <Group gap='sm'>
              <Button
                variant='subtle'
                color='gray'
                size='compact-md'
                px={0}
                onClick={() => router.push('/dashboard')}
              >
                <IconArrowLeft size={20} />
              </Button>
              <Title order={2} c='teal'>
                {companyName || intl.formatMessage({ id: 'company.unnamed' })}
              </Title>
            </Group>
            <Text c='dimmed' size='sm' mt={4} ml={32}>
              {intl.formatMessage({ id: 'company.inn' })}: {company.inn} ·{' '}
              {intl.formatMessage({ id: 'company.snipments' }, { count: total })}
            </Text>
          </Box>
          <Button
            leftSection={<IconPlus size={18} />}
            gradient={{ from: 'cyan', to: 'teal', deg: 90 }}
            variant='gradient'
            size='md'
            radius='md'
            onClick={openCreate}
          >
            {intl.formatMessage({ id: 'company.button.create' })}
          </Button>
        </Group>

        <TextInput
          placeholder={intl.formatMessage({ id: 'company.search.placeholder' })}
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
          noRecordsText={intl.formatMessage({ id: 'company.table.empty' })}
          paginationText={() => ''}
          columns={useSnipmentColumns(intl, openEdit, remove)}
          styles={{
            root: {
              borderRadius: 'var(--mantine-radius-md)'
            }
          }}
        />
      </Stack>
    </DashboardPageShell>
  );
};

export default CompanyPage;
