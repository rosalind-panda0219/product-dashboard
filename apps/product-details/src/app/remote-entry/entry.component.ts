import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '@product-dashboard/models';
import { EventBusService } from '@product-dashboard/services';
import {
  RatingStarsComponent,
  PriceTagComponent,
  BadgeComponent,
  EmptyStateComponent,
} from '@product-dashboard/ui-components';

/*
 * Product details MFE - shows selected product info
 */
@Component({
  selector: 'app-product-details-entry',
  standalone: true,
  imports: [
    CommonModule,
    RatingStarsComponent,
    PriceTagComponent,
    BadgeComponent,
    EmptyStateComponent,
  ],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsEntry implements OnInit, OnDestroy {
  private readonly eventBus = inject(EventBusService);
  private readonly cdr = inject(ChangeDetectorRef); // needed for OnPush + async events
  private readonly destroy$ = new Subject<void>();

  protected readonly selectedProduct = signal<Product | null>(null);

  ngOnInit(): void {
    // subscribe to product events from the list MFE
    this.eventBus
      .onProductSelected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ product }) => {
        this.selectedProduct.set(product);
        this.cdr.markForCheck();
      });

    this.eventBus
      .onProductDeselected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.selectedProduct.set(null);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearSelection(): void {
    this.selectedProduct.set(null);
    this.eventBus.emitProductDeselected('product-details');
  }

  // maps category to badge color variant
  // kinda ugly but it works for now. We can use a pipe instead?
  getCategoryVariant(): 'primary' | 'secondary' | 'success' | 'warning' | 'info' {
    const cat = this.selectedProduct()?.category;
    const map: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
      electronics: 'primary',
      clothing: 'secondary',
      food: 'success',
      books: 'warning',
      'home-garden': 'info',
    };
    return map[cat ?? ''] ?? 'secondary';
  }

  formatCategory(cat: string): string {
    // home-garden -> Home Garden
    return cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }

  getReviewCount(): number {
    // fake review count - just for demo purposes
    const p = this.selectedProduct();
    return p ? Math.floor(p.id * 17 + p.rating * 50) : 0;
  }
}
