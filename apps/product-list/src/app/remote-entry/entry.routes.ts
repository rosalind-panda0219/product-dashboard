import { Route } from '@angular/router';
import { ProductListEntry } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ProductListEntry,
  },
];
