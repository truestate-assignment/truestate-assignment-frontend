import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination & Meta State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filter State
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        perPage,
        search,
        ...filters
      };

      const data = await fetchTransactions(params);

      setTransactions(data.data);
      setTotalPages(data.meta.totalPages);
      setTotalRecords(data.meta.total);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    if (key === 'dateRange') {
      setFilters(prev => ({
        ...prev,
        startDate: value.start,
        endDate: value.end,
        dateRange: value // Keep it for UI state if needed
      }));
    } else if (key === 'ageRange') {
      setFilters(prev => ({
        ...prev,
        minAge: value.min,
        maxAge: value.max,
        ageRange: value
      }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({
      gender: '',
      category: '',
      region: '',
      paymentMethod: '',
      tags: '',
      startDate: '',
      endDate: ''
    });
    setSearch('');
  };

  useEffect(() => {
    loadData();
  }, [page, search, filters]);

  return {
    transactions,
    loading,
    error,
    currentPage: page,
    setCurrentPage: setPage,
    totalPages,
    filters,
    updateFilter,
    resetFilters,
    refreshTransactions: loadData
  };
};

export default useTransactions;