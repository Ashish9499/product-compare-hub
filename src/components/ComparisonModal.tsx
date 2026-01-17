import { X, Battery, Monitor, Camera, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { phones, brandBorderColors, type Phone } from '@/data/phones';
import { cn } from '@/lib/utils';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onRemove: (id: string) => void;
}

type SpecKey = keyof Phone['specs'];

interface SpecConfig {
  key: SpecKey;
  label: string;
  icon: React.ElementType;
  parseValue: (val: string) => number;
  higherIsBetter: boolean;
}

const specConfigs: SpecConfig[] = [
  {
    key: 'battery',
    label: 'Battery',
    icon: Battery,
    parseValue: (val) => parseInt(val.replace(/\D/g, '')),
    higherIsBetter: true,
  },
  {
    key: 'screenSize',
    label: 'Screen Size',
    icon: Monitor,
    parseValue: (val) => parseFloat(val.replace('"', '')),
    higherIsBetter: true,
  },
  {
    key: 'camera',
    label: 'Camera',
    icon: Camera,
    parseValue: (val) => parseInt(val.replace(/\D/g, '')),
    higherIsBetter: true,
  },
  {
    key: 'storage',
    label: 'Storage',
    icon: HardDrive,
    parseValue: (val) => parseInt(val.replace(/\D/g, '')),
    higherIsBetter: true,
  },
  {
    key: 'ram',
    label: 'RAM',
    icon: MemoryStick,
    parseValue: (val) => parseInt(val.replace(/\D/g, '')),
    higherIsBetter: true,
  },
  {
    key: 'processor',
    label: 'Processor',
    icon: Cpu,
    parseValue: () => 0,
    higherIsBetter: true,
  },
];

function getHighlightClass(
  value: string,
  allValues: string[],
  config: SpecConfig
): string {
  if (config.key === 'processor') return '';

  const parsedValues = allValues.map(config.parseValue);
  const currentValue = config.parseValue(value);
  const sortedValues = [...new Set(parsedValues)].sort((a, b) =>
    config.higherIsBetter ? b - a : a - b
  );

  const rank = sortedValues.indexOf(currentValue);

  if (rank === 0) return 'bg-[hsl(var(--highlight-best))]/20 text-[hsl(var(--highlight-best))]';
  if (rank === sortedValues.length - 1 && sortedValues.length > 1)
    return 'bg-[hsl(var(--highlight-low))]/20 text-[hsl(var(--highlight-low))]';
  return 'bg-[hsl(var(--highlight-mid))]/20 text-[hsl(var(--highlight-mid))]';
}

export function ComparisonModal({
  isOpen,
  onClose,
  selectedIds,
  onRemove,
}: ComparisonModalProps) {
  const selectedPhones = selectedIds
    .map((id) => phones.find((p) => p.id === id))
    .filter((p): p is Phone => p !== undefined);

  if (selectedPhones.length < 2) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm p-4 pt-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <Card className="relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-4">
                <div>
                  <h2 className="text-xl font-bold">Comparison</h2>
                  <p className="text-sm text-muted-foreground">
                    Side-by-side specifications
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile: Cards View */}
              <div className="block p-4 md:hidden">
                <div className="space-y-4">
                  {selectedPhones.map((phone) => (
                    <motion.div
                      key={phone.id}
                      layout
                      className={cn(
                        'rounded-xl border-2 p-4',
                        brandBorderColors[phone.brand]
                      )}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={phone.image}
                            alt={phone.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <Badge variant="secondary" className="mb-1">
                              {phone.brand}
                            </Badge>
                            <h3 className="font-semibold">{phone.name}</h3>
                            <p className="text-lg font-bold text-primary">
                              ${phone.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(phone.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {specConfigs.map(({ key, label, icon: Icon }) => {
                          const allValues = selectedPhones.map(
                            (p) => p.specs[key]
                          );
                          const highlightClass = getHighlightClass(
                            phone.specs[key],
                            allValues,
                            specConfigs.find((c) => c.key === key)!
                          );

                          return (
                            <div
                              key={key}
                              className={cn(
                                'flex items-center gap-2 rounded-lg p-2',
                                highlightClass || 'bg-muted'
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">
                                  {label}
                                </p>
                                <p className="truncate text-sm font-medium">
                                  {phone.specs[key]}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Desktop: Table View */}
              <div className="hidden p-4 md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                          Specification
                        </th>
                        {selectedPhones.map((phone) => (
                          <th key={phone.id} className="min-w-[180px] p-3">
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative">
                                <img
                                  src={phone.image}
                                  alt={phone.name}
                                  className={cn(
                                    'h-20 w-20 rounded-xl border-2 object-cover',
                                    brandBorderColors[phone.brand]
                                  )}
                                />
                                <button
                                  onClick={() => onRemove(phone.id)}
                                  className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-lg"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              <Badge variant="secondary">{phone.brand}</Badge>
                              <span className="font-semibold">{phone.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price row */}
                      <tr className="border-t border-border">
                        <td className="p-3 text-sm font-medium">Price</td>
                        {selectedPhones.map((phone) => {
                          const prices = selectedPhones.map((p) => p.price);
                          const minPrice = Math.min(...prices);
                          const maxPrice = Math.max(...prices);
                          let priceClass = '';
                          if (phone.price === minPrice)
                            priceClass =
                              'bg-[hsl(var(--highlight-best))]/20 text-[hsl(var(--highlight-best))]';
                          else if (phone.price === maxPrice)
                            priceClass =
                              'bg-[hsl(var(--highlight-low))]/20 text-[hsl(var(--highlight-low))]';
                          else
                            priceClass =
                              'bg-[hsl(var(--highlight-mid))]/20 text-[hsl(var(--highlight-mid))]';

                          return (
                            <td key={phone.id} className="p-3 text-center">
                              <span
                                className={cn(
                                  'inline-block rounded-lg px-3 py-1 text-lg font-bold',
                                  priceClass
                                )}
                              >
                                ${phone.price.toLocaleString()}
                              </span>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Spec rows */}
                      {specConfigs.map(({ key, label, icon: Icon }) => (
                        <tr key={key} className="border-t border-border">
                          <td className="p-3">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              {label}
                            </div>
                          </td>
                          {selectedPhones.map((phone) => {
                            const allValues = selectedPhones.map(
                              (p) => p.specs[key]
                            );
                            const highlightClass = getHighlightClass(
                              phone.specs[key],
                              allValues,
                              specConfigs.find((c) => c.key === key)!
                            );

                            return (
                              <td key={phone.id} className="p-3 text-center">
                                <span
                                  className={cn(
                                    'inline-block rounded-lg px-3 py-1 font-medium',
                                    highlightClass || 'bg-muted'
                                  )}
                                >
                                  {phone.specs[key]}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
