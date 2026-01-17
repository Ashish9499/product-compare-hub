import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import type { Phone } from '@/data/phones';

interface ProductGridProps {
  phones: Phone[];
  selectedIds: string[];
  canAddMore: boolean;
  onToggleSelection: (id: string) => void;
}

export function ProductGrid({
  phones,
  selectedIds,
  canAddMore,
  onToggleSelection,
}: ProductGridProps) {
  if (phones.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="mb-4 text-6xl">📱</div>
        <h3 className="mb-2 text-xl font-semibold">No phones found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {phones.map((phone, index) => (
        <ProductCard
          key={phone.id}
          phone={phone}
          isSelected={selectedIds.includes(phone.id)}
          canAdd={canAddMore}
          onToggle={() => onToggleSelection(phone.id)}
          index={index}
        />
      ))}
    </div>
  );
}
