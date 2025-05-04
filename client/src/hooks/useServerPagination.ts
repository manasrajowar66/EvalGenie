import { useState, useEffect } from "react";

interface PaginationResult<T> {
  data: T[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export function useServerPagination<T>(
  fetchData: (
    page: number,
    pageSize: number
  ) => Promise<{ data: T[]; total: number }>
): PaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchData(page, pageSize);
        setData(result.data);
        setTotal(result.total);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, pageSize, fetchData]);

  return {
    data,
    total,
    loading,
    error,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}
