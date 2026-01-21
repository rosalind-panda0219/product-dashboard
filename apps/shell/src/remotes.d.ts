// Type declarations for remote micro-frontends loaded via Module Federation

declare module 'product-list/Routes' {
  import { Route } from '@angular/router';
  export const remoteRoutes: Route[];
}

declare module 'product-details/Routes' {
  import { Route } from '@angular/router';
  export const remoteRoutes: Route[];
}
