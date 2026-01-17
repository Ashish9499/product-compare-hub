import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { BrandFilter, PriceFilter } from '@/hooks/useFilters';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  brandFilter: BrandFilter;
  onBrandChange: (value: BrandFilter) => void;
  priceFilter: PriceFilter;
  onPriceChange: (value: PriceFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  brandFilter,
  onBrandChange,
  priceFilter,
  onPriceChange,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount,
}: SearchFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search phones..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <Select value={brandFilter} onValueChange={onBrandChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="Apple">Apple</SelectItem>
              <SelectItem value="Samsung">Samsung</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="OnePlus">OnePlus</SelectItem>
              <SelectItem value="Nothing">Nothing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={onPriceChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="mid">Mid-range</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => onSearchChange('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {brandFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {brandFilter}
                <button onClick={() => onBrandChange('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {priceFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1 capitalize">
                {priceFilter}
                <button onClick={() => onPriceChange('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-destructive hover:text-destructive"
            >
              Clear all ({activeFilterCount})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
