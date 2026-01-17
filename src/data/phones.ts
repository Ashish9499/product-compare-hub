export interface Phone {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Nothing';
  image: string;
  price: number;
  specs: {
    battery: string;
    screenSize: string;
    camera: string;
    storage: string;
    ram: string;
    processor: string;
  };
  priceCategory: 'budget' | 'mid' | 'premium';
}

export const phones: Phone[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=500&fit=crop',
    price: 999,
    specs: {
      battery: '3274 mAh',
      screenSize: '6.1"',
      camera: '48 MP',
      storage: '256 GB',
      ram: '8 GB',
      processor: 'A17 Pro',
    },
    priceCategory: 'premium',
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=500&fit=crop',
    price: 799,
    specs: {
      battery: '3349 mAh',
      screenSize: '6.1"',
      camera: '48 MP',
      storage: '128 GB',
      ram: '6 GB',
      processor: 'A16 Bionic',
    },
    priceCategory: 'premium',
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=500&fit=crop',
    price: 1299,
    specs: {
      battery: '5000 mAh',
      screenSize: '6.8"',
      camera: '200 MP',
      storage: '256 GB',
      ram: '12 GB',
      processor: 'Snapdragon 8 Gen 3',
    },
    priceCategory: 'premium',
  },
  {
    id: 'galaxy-a54',
    name: 'Galaxy A54',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=500&fit=crop',
    price: 449,
    specs: {
      battery: '5000 mAh',
      screenSize: '6.4"',
      camera: '50 MP',
      storage: '128 GB',
      ram: '8 GB',
      processor: 'Exynos 1380',
    },
    priceCategory: 'mid',
  },
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=500&fit=crop',
    price: 999,
    specs: {
      battery: '5050 mAh',
      screenSize: '6.7"',
      camera: '50 MP',
      storage: '128 GB',
      ram: '12 GB',
      processor: 'Tensor G3',
    },
    priceCategory: 'premium',
  },
  {
    id: 'pixel-8a',
    name: 'Pixel 8a',
    brand: 'Google',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop',
    price: 499,
    specs: {
      battery: '4492 mAh',
      screenSize: '6.1"',
      camera: '64 MP',
      storage: '128 GB',
      ram: '8 GB',
      processor: 'Tensor G3',
    },
    priceCategory: 'mid',
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=500&fit=crop',
    price: 799,
    specs: {
      battery: '5400 mAh',
      screenSize: '6.82"',
      camera: '50 MP',
      storage: '256 GB',
      ram: '12 GB',
      processor: 'Snapdragon 8 Gen 3',
    },
    priceCategory: 'premium',
  },
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=500&fit=crop',
    price: 599,
    specs: {
      battery: '4700 mAh',
      screenSize: '6.7"',
      camera: '50 MP',
      storage: '128 GB',
      ram: '8 GB',
      processor: 'Snapdragon 8+ Gen 1',
    },
    priceCategory: 'mid',
  },
];

export const brandColors: Record<Phone['brand'], string> = {
  Apple: 'bg-[hsl(var(--brand-apple))]',
  Samsung: 'bg-[hsl(var(--brand-samsung))]',
  Google: 'bg-[hsl(var(--brand-google))]',
  OnePlus: 'bg-[hsl(var(--brand-oneplus))]',
  Nothing: 'bg-[hsl(var(--brand-nothing))]',
};

export const brandBorderColors: Record<Phone['brand'], string> = {
  Apple: 'border-[hsl(var(--brand-apple))]',
  Samsung: 'border-[hsl(var(--brand-samsung))]',
  Google: 'border-[hsl(var(--brand-google))]',
  OnePlus: 'border-[hsl(var(--brand-oneplus))]',
  Nothing: 'border-[hsl(var(--brand-nothing))]',
};
