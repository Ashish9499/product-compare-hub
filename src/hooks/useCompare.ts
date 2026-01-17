import { useState, useEffect, useCallback } from 'react';
import type { Phone } from '@/data/phones';

const STORAGE_KEY = 'phone-comparison-selected';
const MAX_COMPARE = 3;

export function useCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleSelection = useCallback((phoneId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, phoneId];
    });
  }, []);

  const removeFromCompare = useCallback((phoneId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== phoneId));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (phoneId: string) => selectedIds.includes(phoneId),
    [selectedIds]
  );

  const canAddMore = selectedIds.length < MAX_COMPARE;
  const canCompare = selectedIds.length >= 2;

  return {
    selectedIds,
    toggleSelection,
    removeFromCompare,
    clearAll,
    isSelected,
    canAddMore,
    canCompare,
    maxCompare: MAX_COMPARE,
  };
}
