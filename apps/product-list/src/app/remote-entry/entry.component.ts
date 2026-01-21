import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, finalize, catchError, of } from 'rxjs';
import { Product, ProductCategory } from '@product-dashboard/models';
import { EventBusService, ProductApiService } from '@product-dashboard/services';
import {
  ProductCardComponent,
  LoadingSpinnerComponent,
  ErrorMessageComponent,
  EmptyStateComponent,
  BadgeComponent,
} from '@product-dashboard/ui-components';

/*
 * Product list MFE - displays filterable grid of products
 */
@Component({
  selector: 'app-product-list-entry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    BadgeComponent,
  ],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListEntry implements OnInit, OnDestroy {
  private readonly eventBus = inject(EventBusService);
  private readonly productApi = inject(ProductApiService);
  private readonly destroy$ = new Subject<void>();

  // UI state - all reactive via signals
  protected readonly products = signal<Product[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null); // if null means no error
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('');  // if empty means all categories
  protected readonly showInStockOnly = signal(false);
  protected readonly selectedProductId = signal<number | null>(null);

  protected readonly totalProducts = computed(() => this.products().length);

  protected readonly filteredProducts = computed(() => {
    let items = this.products();
    const term = this.searchTerm().toLowerCase();
    const cat = this.selectedCategory();

    // search across name, description and tags
    // might want to add fuzzy search later if dataset gets bigger or any search feature we want to add
    if (term) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term))
      );
    }
    if (cat) {
      items = items.filter(p => p.category === cat);
    }
    if (this.showInStockOnly()) {
      items = items.filter(p => p.inStock);
    }
    return items;
  });

  // dropdown options
  // TODO: fetch these from API instead of hardcoding
  protected readonly categories = [
    { value: ProductCategory.Electronics, label: 'Electronics' },
    { value: ProductCategory.Clothing, label: 'Clothing' },
    { value: ProductCategory.Food, label: 'Food & Beverage' },
    { value: ProductCategory.Books, label: 'Books' },
    { value: ProductCategory.HomeGarden, label: 'Home & Garden' },
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productApi
      .getProducts()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          this.error.set(err.message || 'Failed to load products');
          return of([]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((products) => {
        this.products.set(products);
      });
  }

  onProductSelect(product: Product): void {
    // toggle behavior - click again to deselect or something like X button we can add
    if (this.selectedProductId() === product.id) {
      this.selectedProductId.set(null);
      this.eventBus.emitProductDeselected('product-list');
    } else {
      this.selectedProductId.set(product.id);
      this.eventBus.emitProductSelected({ productId: product.id, product }, 'product-list');
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
  }

  onStockFilterChange(inStock: boolean): void {
    this.showInStockOnly.set(inStock);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.showInStockOnly.set(false);
  }
}
