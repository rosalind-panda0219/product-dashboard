// Product domain models
// Keep in sync with backend DTOs when that's ready

export interface Product {
  id: number;  // auto-increment PK
  name: string;
  description: string;
  price: number;  // USD
  category: ProductCategory;
  imageUrl: string; // comes from unsplash. Used for showing thumbnails etc
  rating: number;  // 0-5, decimals allowed
  inStock: boolean;
  tags: string[];  // used for search
}

export enum ProductCategory {
  Electronics = 'electronics',
  Clothing = 'clothing',
  Food = 'food',
  Books = 'books',
  HomeGarden = 'home-garden',
}

// Response shape for paginated endpoint, TODO - use in future, skipped for now
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;  // default 20
}

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}

export type ProductId = Product['id'];
