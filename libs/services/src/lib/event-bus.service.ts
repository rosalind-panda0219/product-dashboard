import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import {
  AppEvent,
  EventType,
  createEvent,
  ProductSelectedPayload,
} from '@product-dashboard/models';

// Global key for sharing event bus across MFE boundaries
// DON'T change this without updating all remotes!
const GLOBAL_KEY = '__PRODUCT_DASHBOARD_EVENT_BUS__';

declare global {
  interface Window {
    [GLOBAL_KEY]?: EventBusCore;
  }
}

/**
 * Core event bus singleton - lives on window object.
 * 
 * Why window? Because each MFE bundle gets its own Angular injector,
 * so regular services won't be shared.
 */
class EventBusCore {
  readonly eventSubject = new BehaviorSubject<AppEvent | null>(null);
  readonly history: AppEvent[] = [];  // useful for debugging
  readonly maxHistory = 100;  // prevent memory leaks

  readonly events$: Observable<AppEvent> = this.eventSubject.asObservable().pipe(
    filter((e): e is AppEvent => e !== null)
  );

  push(event: AppEvent): void {
    this.history.push(event);
    if (this.history.length > this.maxHistory) this.history.shift();
    this.eventSubject.next(event);
  }
}

// Get or create the global singleton
// SSR fallback creates ephemeral instance (won't work but won't crash)
function getCore(): EventBusCore {
  if (typeof window !== 'undefined') {
    window[GLOBAL_KEY] ??= new EventBusCore();
    return window[GLOBAL_KEY];
  }
  return new EventBusCore(); // SSR fallback
}

/**
 * Angular wrapper for the event bus.
 * 
 * All instances point to the same core, so providedIn: 'root' is fine.
 */
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly core = getCore();

  get events$(): Observable<AppEvent> {
    return this.core.events$;
  }

  get lastEvent(): AppEvent | null {
    return this.core.eventSubject.getValue();
  }

  get history(): ReadonlyArray<AppEvent> {
    return [...this.core.history];
  }

  emit<T extends AppEvent>(event: T): void {
    this.core.push(event);
  }

  on<T extends EventType>(type: T): Observable<AppEvent & { type: T }> {
    return this.events$.pipe(
      filter((e): e is AppEvent & { type: T } => e.type === type)
    );
  }

  // convenience methods for product events
  onProductSelected(): Observable<ProductSelectedPayload> {
    return this.on(EventType.ProductSelected).pipe(
      map(e => e.payload as ProductSelectedPayload)
    );
  }

  onProductDeselected(): Observable<null> {
    return this.on(EventType.ProductDeselected).pipe(map(() => null));
  }

  emitProductSelected(payload: ProductSelectedPayload, source: string): void {
    this.emit(createEvent(EventType.ProductSelected, payload, source) as AppEvent);
  }

  emitProductDeselected(source: string): void {
    this.emit(createEvent(EventType.ProductDeselected, null, source) as AppEvent);
  }

  clearHistory(): void {
    this.core.history.length = 0;
  }
}
