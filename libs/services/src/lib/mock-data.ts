import { Product, ProductCategory } from '@product-dashboard/models';

/*
 * Mock product data for local dev.
 * Images from Unsplash - as they cache well.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and remote workers.',
    price: 299.99,
    category: ProductCategory.Electronics,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.8,
    inStock: true,
    tags: ['wireless', 'bluetooth', 'noise-canceling', 'premium'],
  },
  {
    id: 2,
    name: 'Smart Fitness Watch Pro',
    description:
      'Track your health and fitness with this advanced smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis, and 100+ workout modes.',
    price: 249.99,
    category: ProductCategory.Electronics,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    rating: 4.6,
    inStock: true,
    tags: ['fitness', 'smart', 'health', 'wearable'],
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    description:
      'Sustainable and comfortable organic cotton t-shirt. Made from 100% GOTS certified organic cotton with eco-friendly dyes. Available in multiple colors.',
    price: 34.99,
    category: ProductCategory.Clothing,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    rating: 4.5,
    inStock: true,
    tags: ['organic', 'sustainable', 'cotton', 'casual'],
  },
  {
    id: 4,
    name: 'Premium Coffee Bean Collection',
    description:
      'A curated selection of single-origin Arabica coffee beans from Colombia, Ethiopia, and Brazil. Medium roast for a balanced, smooth flavor profile.',
    price: 45.99,
    category: ProductCategory.Food,
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    rating: 4.9,
    inStock: true,
    tags: ['coffee', 'organic', 'premium', 'arabica'],
  },
  {
    id: 5,
    name: 'The Art of Clean Code',
    description:
      'A comprehensive guide to writing maintainable, readable, and efficient code. Learn best practices from industry experts with practical examples.',
    price: 49.99,
    category: ProductCategory.Books,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    rating: 4.7,
    inStock: true,
    tags: ['programming', 'software', 'education', 'tech'],
  },
  {
    id: 6,
    name: 'Minimalist Desk Lamp',
    description:
      'Modern LED desk lamp with adjustable brightness and color temperature. Features a sleek aluminum design and USB charging port for convenience.',
    price: 79.99,
    category: ProductCategory.HomeGarden,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    rating: 4.4,
    inStock: true,
    tags: ['lighting', 'modern', 'office', 'LED'],
  },
  {
    id: 7,
    name: 'Mechanical Keyboard RGB',
    description:
      'Premium mechanical keyboard with Cherry MX switches, per-key RGB lighting, and a durable aluminum frame. Perfect for gaming and productivity.',
    price: 159.99,
    category: ProductCategory.Electronics,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    rating: 4.8,
    inStock: false,
    tags: ['gaming', 'mechanical', 'RGB', 'keyboard'],
  },
  {
    id: 8,
    name: 'Wool Blend Winter Jacket',
    description:
      'Stay warm in style with this premium wool blend jacket. Features a water-resistant exterior, warm fleece lining, and multiple pockets.',
    price: 189.99,
    category: ProductCategory.Clothing,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    rating: 4.6,
    inStock: true,
    tags: ['winter', 'wool', 'jacket', 'warm'],
  },
  {
    id: 9,
    name: 'Artisan Chocolate Gift Box',
    description:
      'Handcrafted Belgian chocolates with exotic flavors including sea salt caramel, raspberry truffle, and dark espresso. Perfect for gifting.',
    price: 39.99,
    category: ProductCategory.Food,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    rating: 4.9,
    inStock: true,
    tags: ['chocolate', 'gift', 'artisan', 'belgian'],
  },
  {
    id: 10,
    name: 'Indoor Plant Collection',
    description:
      'Bring life to your space with this curated set of three low-maintenance indoor plants: Snake Plant, Pothos, and Peace Lily. Includes decorative pots.',
    price: 59.99,
    category: ProductCategory.HomeGarden,
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
    rating: 4.5,
    inStock: true,
    tags: ['plants', 'indoor', 'decor', 'green'],
  },
  {
    id: 11,
    name: 'Portable Bluetooth Speaker',
    description:
      'Compact yet powerful Bluetooth speaker with 360° surround sound, waterproof design (IPX7), and 24-hour battery life. Perfect for outdoor adventures.',
    price: 89.99,
    category: ProductCategory.Electronics,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    rating: 4.7,
    inStock: true,
    tags: ['bluetooth', 'speaker', 'portable', 'waterproof'],
  },
  {
    id: 12,
    name: 'JavaScript: The Definitive Guide',
    description:
      'Master JavaScript with this comprehensive guide covering ES6+, async programming, DOM manipulation, and modern frameworks. Essential for web developers.',
    price: 54.99,
    category: ProductCategory.Books,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    rating: 4.8,
    inStock: true,
    tags: ['javascript', 'programming', 'web', 'development'],
  },
];

// helper fns for mock API
export const simulateDelay = (ms = 500) => new Promise<void>(r => setTimeout(r, ms));
export const getMockProducts = () => [...MOCK_PRODUCTS];
export const getMockProductById = (id: number) => MOCK_PRODUCTS.find(p => p.id === id);
export const getMockProductsByCategory = (cat: ProductCategory) => MOCK_PRODUCTS.filter(p => p.category === cat);

export const searchMockProducts = (term: string) => {
  const t = term.toLowerCase();
  return MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(t) ||
    p.description.toLowerCase().includes(t) ||
    p.tags.some(tag => tag.toLowerCase().includes(t))
  );
};
