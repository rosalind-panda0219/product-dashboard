import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@product-dashboard/models';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { PriceTagComponent } from '../price-tag/price-tag.component';
import { BadgeComponent } from '../badge/badge.component';

// product card component - can be reused
@Component({
  selector: 'ui-product-card',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent, PriceTagComponent, BadgeComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() selected = false;

  @Output() cardClick = new EventEmitter<Product>();  // parent handles selection logic

  onCardClick(): void {
    this.cardClick.emit(this.product);
  }

  // maps category to badge color (TODO: - refactor this with pipe based approach)
  getCategoryVariant(cat: string): 'primary' | 'secondary' | 'success' | 'warning' | 'info' {
    const map: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
      electronics: 'primary',
      clothing: 'secondary',
      food: 'success',
      books: 'warning',
      'home-garden': 'info',
    };
    return map[cat] ?? 'secondary';
  }

  formatCategory(cat: string): string {
    return cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  }
}
