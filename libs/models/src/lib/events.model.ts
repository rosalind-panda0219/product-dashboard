import { Product, ProductId } from './product.model';

// Event types for pub/sub communication
// New types can be added by adding new types here, then add matching interface below
export enum EventType {
  ProductSelected = 'product:selected',
  ProductDeselected = 'product:deselected',
  ProductListLoaded = 'product:list:loaded',
  ProductListError = 'product:list:error',
}

export interface BaseEvent<T = unknown> {
  type: EventType;
  payload: T;
  timestamp: number;
  source: string;
}

export interface ProductSelectedPayload {
  productId: ProductId;
  product: Product;
}

// specific event types
export interface ProductSelectedEvent extends BaseEvent<ProductSelectedPayload> {
  type: EventType.ProductSelected;
}

export interface ProductDeselectedEvent extends BaseEvent<null> {
  type: EventType.ProductDeselected;
}

export interface ProductListLoadedEvent extends BaseEvent<{ count: number }> {
  type: EventType.ProductListLoaded;
}

export interface ProductListErrorEvent extends BaseEvent<{ error: string }> {
  type: EventType.ProductListError;
}

// Union type for type-safe event handling
export type AppEvent =
  | ProductSelectedEvent
  | ProductDeselectedEvent
  | ProductListLoadedEvent
  | ProductListErrorEvent;

// Factory for consistent event creation, we can add more if needed
// Usage: createEvent(EventType.ProductSelected, { productId, product }, 'product-list')
export function createEvent<T extends EventType, P>(type: T, payload: P, source: string): BaseEvent<P> {
  return { type, payload, timestamp: Date.now(), source };
}
