import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="variant">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
    }

    .primary {
      background: var(--badge-primary-bg, #dbeafe);
      color: var(--badge-primary-color, #1d4ed8);
    }

    .secondary {
      background: var(--badge-secondary-bg, #f3f4f6);
      color: var(--badge-secondary-color, #4b5563);
    }

    .success {
      background: var(--badge-success-bg, #d1fae5);
      color: var(--badge-success-color, #047857);
    }

    .warning {
      background: var(--badge-warning-bg, #fef3c7);
      color: var(--badge-warning-color, #b45309);
    }

    .danger {
      background: var(--badge-danger-bg, #fee2e2);
      color: var(--badge-danger-color, #b91c1c);
    }

    .info {
      background: var(--badge-info-bg, #e0e7ff);
      color: var(--badge-info-color, #4338ca);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
}
