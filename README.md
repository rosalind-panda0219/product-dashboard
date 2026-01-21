# Product Dashboard - Angular Micro-Frontend System

## Quick Start for development

### Prerequisites

- Node.js 24 
- npm 11+

### Installation

```bash
cd product-dashboard

npm install
```

### Running the Application

# Start all applications (shell + remotes)
`npx nx serve shell`

The application will be available at:
- **Shell (Main App)**: http://localhost:4200
- **Product List MFE**: http://localhost:4201
- **Product Details MFE**: http://localhost:4202

landing page will look something like below.

![alt text](image.png)

## Useful Commands

```bash
# Development
npx nx serve shell                    # Start shell with all remotes
npx nx serve product-list             # Start product-list only
npx nx serve product-details          # Start product-details only

# Dependency Graph
npx nx graph                          # View dependency graph
```


## Project Structure

### Applications

#### Shell (`apps/shell`)
The host application that:
- Provides the main layout and navigation
- Loads MFEs via Module Federation at runtime
- Coordinates communication between MFEs

#### Product List MFE (`apps/product-list`)
Responsible for:
- Displaying the product catalog
- Search and filter functionality
- Emitting product selection events

#### Product Details MFE (`apps/product-details`)
Responsible for:
- Displaying detailed product information
- Reacting to product selection events
- Showing empty state when no product selected

### Libraries

#### Models (`libs/models`)
#### Services (`libs/services`)
  - EventBusService
  - ProductApiService
#### UI Components (`libs/ui-components`)
  - ProductCardComponent
  - LoadingSpinnerComponent
  - ErrorMessageComponent
  - RatingStarsComponent
  - PriceTagComponent
  - BadgeComponent
  - EmptyStateComponent


## MFE Communication

### Event Flow

```
┌─────────────────┐     Event      ┌─────────────────┐
│  Product List   │ ──────────────▶│    EventBus     │
│      MFE        │  (selection)   │    Service      │
└─────────────────┘                └────────┬────────┘
                                            │
                                            │ Observable
                                            ▼
                                   ┌─────────────────┐
                                   │ Product Details │
                                   │      MFE        │
                                   └─────────────────┘
```


## Architecture Overview

```
product-dashboard/
├── apps/
│   ├── shell/              # Host application
│   ├── product-list/       # MFE: Product listing functionality
│   └── product-details/    # MFE: Product detail view
└── libs/
    ├── models/             # Shared TypeScript interfaces & types
    ├── services/           # Shared services like EventBus, API
    └── ui-components/      # Reusable UI components
```

### Key Architecture Decisions

1. **Module Federation for Runtime Integration**
2. **Event-Based Communication**
   - MFEs communicate through a shared EventBus service
   - No direct imports between MFEs (loose coupling)
3. **Shared Libraries in Monorepo**
   - `@product-dashboard/models` - TypeScript interfaces
   - `@product-dashboard/services` - Angular services (EventBus, API)
   - `@product-dashboard/ui-components` - Reusable Angular components
4. **Standalone Components**
   - Using Angular's standalone component architecture

## What I Would Improve With Time if it has to be a production-grade application

### Architecture Improvements
1. **State Management**: Implement NgRx or Angular Signals Store for complex state
2. **Error Boundaries**: Add error boundary components for MFE isolation so unexpected errors don't result in crashed pages
3. **Versioning Strategy**: Implement semantic versioning for MFEs
4. **Feature Flags**: Add runtime feature flag support - This would allow us to release features and then control them with flags giving better control without need to rollback.

### Testing
1. **Unit Tests**: Add comprehensive unit tests for components and services
2. **Integration Tests**: Test MFE communication scenarios
3. **E2E Tests**: Add Playwright/Cypress tests for critical flows
4. **Contract Tests**: Ensure MFE interface compatibility

### Performance
1. **Lazy Loading**: Implement more granular lazy loading to enhance performance.
2. **Bundle Analysis**: Optimize bundle sizes
3. **Caching Strategy**: Implement service worker caching to keep static (doesn't change frequently) data in cache.
4. **Preloading**: Strategic preloading of likely-needed MFEs

### DevOps
1. **CI/CD Pipeline**: Automated testing and deployment
2. **Independent Deployments**: Deploy MFEs to separate CDNs
3. **Monitoring**: Add observability (logging, metrics, tracing)
4. **Blue-Green Deployments**: Zero-downtime updates

### UX Enhancements
1. **Dark Mode**: Add theme switching - if needed
2. **Animations**: Smoother transitions
3. **Offline Support**: PWA capabilities - if needed
4. **Internationalization**: i18n support - if needed
