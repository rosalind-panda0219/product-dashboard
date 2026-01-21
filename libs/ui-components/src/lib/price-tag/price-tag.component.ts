import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ui-price-tag',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <span class="price-tag" [class.large]="size === 'large'" [class.small]="size === 'small'">
      @if (originalPrice && originalPrice > price) {
        <span class="original-price">{{ originalPrice | currency:currency }}</span>
      }
      <span class="current-price">{{ price | currency:currency }}</span>
      @if (originalPrice && originalPrice > price) {
        <span class="discount-badge">
          {{ getDiscountPercentage() }}% OFF
        </span>
      }
    </span>
  `,
  styles: [`
    .price-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .current-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--price-color, #059669);
    }

    .small .current-price {
      font-size: 1rem;
    }

    .large .current-price {
      font-size: 1.5rem;
    }

    .original-price {
      font-size: 0.875rem;
      color: var(--text-muted, #9ca3af);
      text-decoration: line-through;
    }

    .discount-badge {
      padding: 2px 8px;
      background: var(--discount-bg, #fef3c7);
      color: var(--discount-color, #d97706);
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceTagComponent {
  @Input({ required: true }) price!: number;
  @Input() originalPrice?: number;
  @Input() currency = 'USD';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getDiscountPercentage(): number {
    if (!this.originalPrice || this.originalPrice <= this.price) {
      return 0;
    }
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
}
