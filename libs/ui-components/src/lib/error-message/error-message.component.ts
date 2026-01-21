import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="error-container"
      role="alert"
      aria-live="assertive"
    >
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <div class="error-content">
        @if (title) {
          <h4 class="error-title">{{ title }}</h4>
        }
        <p class="error-message">{{ message }}</p>
      </div>

      @if (showRetry) {
        <button class="retry-button" (click)="onRetry()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {{ retryText }}
        </button>
      }
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 32px;
      text-align: center;
      background: var(--error-bg, #fef2f2);
      border: 1px solid var(--error-border, #fecaca);
      border-radius: 12px;
    }

    .error-icon {
      width: 48px;
      height: 48px;
      color: var(--error-color, #ef4444);
    }

    .error-icon svg {
      width: 100%;
      height: 100%;
    }

    .error-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .error-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--error-color, #dc2626);
    }

    .error-message {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
    }

    .retry-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--primary-color, #3b82f6);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--primary-hover, #2563eb);
      }

      &:focus {
        outline: 2px solid var(--primary-color, #3b82f6);
        outline-offset: 2px;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() title?: string;
  @Input() message = 'An error occurred. Please try again.';
  @Input() showRetry = true;
  @Input() retryText = 'Try Again';

  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
