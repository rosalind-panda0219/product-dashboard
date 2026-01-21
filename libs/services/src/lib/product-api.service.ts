import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Product, ProductFilter, ProductCategory, ProductId } from '@product-dashboard/models';
import {
  getMockProducts,
  getMockProductById,
  getMockProductsByCategory,
  searchMockProducts,
} from './mock-data';

/**
 * Mock product API service.
 * Simulates network latency with fake delays. Replace with real
 * HttpClient calls when the backend is ready
 */
@Injectable({ providedIn: 'root' })
export class ProductApiService {
  // Artificial delay to simulate network - set to 0 for faster dev
  private readonly DELAY = 300;

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let products = getMockProducts();
    if (filter) products = this.applyFilter(products, filter);
    return of(products).pipe(delay(this.DELAY));
  }

  getProductById(id: ProductId): Observable<Product> {
    const product = getMockProductById(id);
    if (!product) {
      return throwError(() => new Error(`Product ${id} not found`)).pipe(delay(this.DELAY));
    }
    return of(product).pipe(delay(this.DELAY));
  }

  getProductsByCategory(cat: ProductCategory): Observable<Product[]> {
    return of(getMockProductsByCategory(cat)).pipe(delay(this.DELAY));
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term?.trim()) return this.getProducts();  // empty search means all products
    return of(searchMockProducts(term)).pipe(delay(this.DELAY));
  }

  getCategories(): Observable<{ category: ProductCategory; count: number }[]> {
    const counts = new Map<ProductCategory, number>();
    getMockProducts().forEach(p => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    const result = Array.from(counts.entries()).map(([category, count]) => ({ category, count }));
    return of(result).pipe(delay(this.DELAY));
  }

  getFeaturedProducts(limit = 4): Observable<Product[]> {
    const featured = getMockProducts()
      .filter(p => p.inStock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return of(featured).pipe(delay(this.DELAY));
  }

  private applyFilter(products: Product[], f: ProductFilter): Product[] {
    return products.filter(p => {
      if (f.category && p.category !== f.category) return false;
      if (f.minPrice != null && p.price < f.minPrice) return false;
      if (f.maxPrice != null && p.price > f.maxPrice) return false;
      if (f.inStock != null && p.inStock !== f.inStock) return false;

      if (f.searchTerm) {
        const term = f.searchTerm.toLowerCase();
        const matches = p.name.toLowerCase().includes(term) ||
                        p.description.toLowerCase().includes(term) ||
                        p.tags.some(t => t.toLowerCase().includes(term));
        if (!matches) return false;
      }
      return true;
    });
  }
}
