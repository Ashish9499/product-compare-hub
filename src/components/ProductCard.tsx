import { Check, Plus, Battery, Monitor, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { brandBorderColors, type Phone } from '@/data/phones';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  phone: Phone;
  isSelected: boolean;
  canAdd: boolean;
  onToggle: () => void;
  index: number;
}

export function ProductCard({
  phone,
  isSelected,
  canAdd,
  onToggle,
  index,
}: ProductCardProps) {
  const isDisabled = !isSelected && !canAdd;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          'hover:shadow-xl hover:-translate-y-1',
          isSelected && 'ring-2 ring-primary shadow-lg shadow-primary/20',
          isDisabled && 'opacity-60'
        )}
      >
        {/* Selection indicator */}
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1 : 0,
            opacity: isSelected ? 1 : 0,
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <Check className="h-4 w-4" />
        </motion.div>

        {/* Brand accent bar */}
        <div
          className={cn(
            'h-1 w-full',
            brandBorderColors[phone.brand].replace('border-', 'bg-')
          )}
        />

        <CardContent className="p-4">
          {/* Image */}
          <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={phone.image}
              alt={phone.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute left-2 top-2 font-medium"
            >
              {phone.brand}
            </Badge>
          </div>

          {/* Info */}
          <div className="mb-4 space-y-1">
            <h3 className="font-semibold tracking-tight">{phone.name}</h3>
            <p className="text-2xl font-bold text-primary">
              ${phone.price.toLocaleString()}
            </p>
          </div>

          {/* Key specs */}
          <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center rounded-lg bg-muted p-2">
              <Battery className="mb-1 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{phone.specs.battery}</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-muted p-2">
              <Monitor className="mb-1 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{phone.specs.screenSize}</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-muted p-2">
              <Camera className="mb-1 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{phone.specs.camera}</span>
            </div>
          </div>

          {/* Add to compare button */}
          <Button
            onClick={onToggle}
            disabled={isDisabled}
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              'w-full transition-all',
              isSelected && 'gradient-primary border-0'
            )}
          >
            {isSelected ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Selected
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add to Compare
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
