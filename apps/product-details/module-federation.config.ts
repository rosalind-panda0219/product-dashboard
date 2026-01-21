import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'product-details',
  exposes: {
    './Routes': 'apps/product-details/src/app/remote-entry/entry.routes.ts',
  },
  /**
   * Shared libraries configuration - ensures singleton instances
   */
  shared: (libraryName, sharedConfig) => {
    // Ensure our custom libraries are shared as singletons
    if (libraryName.startsWith('@product-dashboard/')) {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      };
    }
    return sharedConfig;
  },
};

export default config;
