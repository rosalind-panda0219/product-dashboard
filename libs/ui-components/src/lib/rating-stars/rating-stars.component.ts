import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-rating-stars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rating-container" [attr.aria-label]="'Rating: ' + rating + ' out of 5 stars'">
      <div class="stars">
        @for (star of stars; track star.index) {
          <svg
            viewBox="0 0 24 24"
            class="star"
            [class.filled]="star.filled"
            [class.half]="star.half"
          >
            <defs>
              <linearGradient [id]="'star-gradient-' + star.index">
                <stop offset="50%" stop-color="currentColor" />
                <stop offset="50%" stop-color="transparent" />
              </linearGradient>
            </defs>
            <path
              [attr.fill]="star.half ? 'url(#star-gradient-' + star.index + ')' : (star.filled ? 'currentColor' : 'none')"
              stroke="currentColor"
              stroke-width="1.5"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        }
      </div>
      @if (showValue) {
        <span class="rating-value">{{ rating.toFixed(1) }}</span>
      }
    </div>
  `,
  styles: [`
    .rating-container {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      width: 16px;
      height: 16px;
      color: var(--star-empty, #d1d5db);
      transition: color 0.2s ease;

      &.filled,
      &.half {
        color: var(--star-filled, #fbbf24);
      }
    }

    .rating-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary, #1f2937);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {
  @Input() rating = 0;
  @Input() maxRating = 5;
  @Input() showValue = true;

  get stars(): { index: number; filled: boolean; half: boolean }[] {
    return Array.from({ length: this.maxRating }, (_, i) => {
      const diff = this.rating - i;
      return {
        index: i,
        filled: diff >= 1,
        half: diff > 0 && diff < 1,
      };
    });
  }
}
