// src/hooks/useBlogs.js
// Reusable hook for fetching paginated/filtered blog lists.
import { useState, useEffect, useCallback } from 'react';
import { blogAPI } from '@/api/APIs';

export function useBlogs(initialParams = {}) {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await blogAPI.getAll(params);
      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateParams = (newParams) =>
    setParams((prev) => ({ ...prev, ...newParams }));

  const refresh = () => fetch();

  return { blogs, total, pages, loading, error, params, updateParams, refresh };
}

export default useBlogs;
