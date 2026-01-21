import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="spinner-container"
      [class.small]="size === 'small'"
      [class.large]="size === 'large'"
      role="status"
      aria-live="polite"
    >
      <div class="spinner">
        <svg viewBox="0 0 50 50" class="circular">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            class="path"
          />
        </svg>
      </div>
      @if (message) {
        <p class="message">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
    }

    .spinner {
      width: 48px;
      height: 48px;
      color: var(--primary-color, #3b82f6);
    }

    .small .spinner {
      width: 24px;
      height: 24px;
    }

    .large .spinner {
      width: 64px;
      height: 64px;
    }

    .circular {
      animation: rotate 2s linear infinite;
    }

    .path {
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    .message {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message?: string;
}
