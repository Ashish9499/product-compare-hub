import { useState, useMemo, useCallback } from 'react';
import { phones, type Phone } from '@/data/phones';

export type BrandFilter = Phone['brand'] | 'all';
export type PriceFilter = Phone['priceCategory'] | 'all';

export function useFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchesSearch =
        searchQuery === '' ||
        phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand =
        brandFilter === 'all' || phone.brand === brandFilter;

      const matchesPrice =
        priceFilter === 'all' || phone.priceCategory === priceFilter;

      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [searchQuery, brandFilter, priceFilter]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setBrandFilter('all');
    setPriceFilter('all');
  }, []);

  const hasActiveFilters =
    searchQuery !== '' || brandFilter !== 'all' || priceFilter !== 'all';

  const activeFilterCount = [
    searchQuery !== '',
    brandFilter !== 'all',
    priceFilter !== 'all',
  ].filter(Boolean).length;

  return {
    searchQuery,
    setSearchQuery,
    brandFilter,
    setBrandFilter,
    priceFilter,
    setPriceFilter,
    filteredPhones,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
