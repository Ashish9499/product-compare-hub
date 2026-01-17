import { X, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { phones, type Phone } from '@/data/phones';

interface CompareBarProps {
  selectedIds: string[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onCompare: () => void;
  canCompare: boolean;
  maxCompare: number;
}

export function CompareBar({
  selectedIds,
  onRemove,
  onClearAll,
  onCompare,
  canCompare,
  maxCompare,
}: CompareBarProps) {
  const selectedPhones = selectedIds
    .map((id) => phones.find((p) => p.id === id))
    .filter((p): p is Phone => p !== undefined);

  return (
    <AnimatePresence>
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 p-4">
            {/* Selected phones */}
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                {selectedIds.length}/{maxCompare} selected
              </span>
              
              <div className="flex gap-2">
                {selectedPhones.map((phone) => (
                  <motion.div
                    key={phone.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3"
                  >
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {phone.name}
                    </span>
                    <button
                      onClick={() => onRemove(phone.id)}
                      className="ml-1 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
              
              <Button
                onClick={onCompare}
                disabled={!canCompare}
                className="gradient-primary border-0"
              >
                Compare
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
