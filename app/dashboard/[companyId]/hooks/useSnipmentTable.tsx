'use client';

import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import type { Snipment } from '../../types';

interface UseSnipmentTableParams {
  snipments: Snipment[];
  pageSize?: number;
  debounceMs?: number;
}

export const useSnipmentTable = ({
  snipments,
  pageSize = 10,
  debounceMs = 300
}: UseSnipmentTableParams) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearch] = useDebouncedValue(searchQuery, debounceMs);

  const filteredSnipments = useMemo(() => {
    if (!debouncedSearch) return snipments;

    const query = debouncedSearch.toLowerCase();
    return snipments.filter(
      (snipment) =>
        snipment.tons.includes(query) || snipment.createdBy.toLowerCase().includes(query)
    );
  }, [snipments, debouncedSearch]);

  const paginatedSnipments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSnipments.slice(start, start + pageSize);
  }, [filteredSnipments, page, pageSize]);

  return {
    paginate: { page, setPage },
    search: { searchQuery, setSearchQuery },
    total: filteredSnipments.length,
    records: paginatedSnipments
  };
};
