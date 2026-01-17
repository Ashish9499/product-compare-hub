import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchFilter } from '@/components/SearchFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { CompareBar } from '@/components/CompareBar';
import { ComparisonModal } from '@/components/ComparisonModal';
import { useTheme } from '@/hooks/useTheme';
import { useCompare } from '@/hooks/useCompare';
import { useFilters } from '@/hooks/useFilters';

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    selectedIds,
    toggleSelection,
    removeFromCompare,
    clearAll,
    canAddMore,
    canCompare,
    maxCompare,
  } = useCompare();

  const {
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
  } = useFilters();

  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smartphone
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Compare up to {maxCompare} phones side-by-side. Select your favorites
            and see how they stack up against each other.
          </p>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          brandFilter={brandFilter}
          onBrandChange={setBrandFilter}
          priceFilter={priceFilter}
          onPriceChange={setPriceFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
        />

        <ProductGrid
          phones={filteredPhones}
          selectedIds={selectedIds}
          canAddMore={canAddMore}
          onToggleSelection={toggleSelection}
        />
      </main>

      <CompareBar
        selectedIds={selectedIds}
        onRemove={removeFromCompare}
        onClearAll={clearAll}
        onCompare={() => setShowComparison(true)}
        canCompare={canCompare}
        maxCompare={maxCompare}
      />

      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        selectedIds={selectedIds}
        onRemove={removeFromCompare}
      />
    </div>
  );
};

export default Index;
