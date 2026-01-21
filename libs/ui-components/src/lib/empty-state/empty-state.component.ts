import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="icon-container">
        @switch (icon) {
          @case ('search') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
          @case ('product') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          }
          @case ('info') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          }
          @default {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          }
        }
      </div>

      <h3 class="title">{{ title }}</h3>

      @if (description) {
        <p class="description">{{ description }}</p>
      }

      @if (actionText) {
        <button class="action-button" (click)="onAction()">
          {{ actionText }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
    }

    .icon-container {
      width: 64px;
      height: 64px;
      color: var(--empty-icon-color, #9ca3af);
      margin-bottom: 16px;
    }

    .icon-container svg {
      width: 100%;
      height: 100%;
    }

    .title {
      margin: 0 0 8px;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary, #1f2937);
    }

    .description {
      margin: 0 0 24px;
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      max-width: 400px;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      padding: 10px 24px;
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
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() title = 'No items found';
  @Input() description?: string;
  @Input() icon: 'search' | 'product' | 'info' | 'default' = 'default';
  @Input() actionText?: string;

  @Output() action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }
}
