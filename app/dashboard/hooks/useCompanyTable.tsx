'use client';

import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import type { Company } from '../types';

interface UseCompanyTableParams {
  companies: Company[];
  pageSize?: number;
  debounceMs?: number;
}

export const useCompanyTable = ({
  companies,
  pageSize = 10,
  debounceMs = 300
}: UseCompanyTableParams) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearch] = useDebouncedValue(searchQuery, debounceMs);

  const filteredCompanies = useMemo(() => {
    if (!debouncedSearch) return companies;

    const query = debouncedSearch.toLowerCase();

    return companies.filter(
      (c) => String(c.inn).includes(query) || (c.name && c.name.toLowerCase().includes(query))
    );
  }, [companies, debouncedSearch]);

  const paginatedCompanies = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCompanies.slice(start, start + pageSize);
  }, [filteredCompanies, page, pageSize]);

  return {
    paginate: { page, setPage },
    search: { searchQuery, setSearchQuery },
    total: filteredCompanies.length,
    records: paginatedCompanies
  };
};
