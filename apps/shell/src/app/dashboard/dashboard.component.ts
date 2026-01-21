import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  EnvironmentInjector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { loadRemoteModule } from '@nx/angular/mf';
import { EventBusService } from '@product-dashboard/services';
import { Product } from '@product-dashboard/models';

/*
 * Main shell dashboard - hosts both MFEs side by side
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('productListContainer', { read: ViewContainerRef })
  productListContainer!: ViewContainerRef;

  @ViewChild('productDetailsContainer', { read: ViewContainerRef })
  productDetailsContainer!: ViewContainerRef;

  private readonly eventBus = inject(EventBusService);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly destroy$ = new Subject<void>();

  protected readonly selectedProduct = signal<Product | null>(null);
  protected readonly hasSelectedProduct = signal(false);
  protected readonly selectedProductName = signal('');

  protected readonly productListLoading = signal(true);
  protected readonly productListLoaded = signal(false);
  protected readonly productDetailsLoading = signal(true);
  protected readonly productDetailsLoaded = signal(false);

  // could probably consolidate these into a single object but signals are cheap and this increases readability.

  ngOnInit(): void {
    // listen for product selection changes from the list MFE
    // using takeUntil pattern - saw too many memory leaks without this.
    this.eventBus
      .onProductSelected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ product }) => {
        this.selectedProduct.set(product);
        this.hasSelectedProduct.set(true);
        this.selectedProductName.set(product.name);
      });

    this.eventBus
      .onProductDeselected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.selectedProduct.set(null);
        this.hasSelectedProduct.set(false);
        this.selectedProductName.set('');
      });
  }

  async ngAfterViewInit(): Promise<void> {
    // kick off both MFE loads at once - sequential load would have been slower
    await Promise.all([this.loadProductListMFE(), this.loadProductDetailsMFE()]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadProductListMFE(): Promise<void> {
    try {
      const module = await loadRemoteModule('product-list', './Routes');
      const routes = module.remoteRoutes;
      if (routes?.[0]?.component) {
        // need to pass shell's injector so MFE gets same service instances
        this.productListContainer.createComponent(routes[0].component, {
          environmentInjector: this.envInjector,
        });
        this.productListLoaded.set(true);
      }
    } catch (err) {
      console.error('Failed to load product-list MFE:', err);
    } finally {
      this.productListLoading.set(false);
    }
  }

  private async loadProductDetailsMFE(): Promise<void> {
    try {
      const module = await loadRemoteModule('product-details', './Routes');
      const routes = module.remoteRoutes;

      if (routes?.[0]?.component) {
        this.productDetailsContainer.createComponent(routes[0].component, {
          environmentInjector: this.envInjector,
        });
        this.productDetailsLoaded.set(true);
      }
    } catch (err) {
      console.error('Failed to load product-details MFE:', err);
    } finally {
      this.productDetailsLoading.set(false);
    }
  }
}
