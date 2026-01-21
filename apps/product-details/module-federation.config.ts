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
    // Workspace libs need singleton: true but NOT strictVersion
    // (they all have version 0.0.0 which causes issues with strict checks)
    if (libraryName.startsWith('@product-dashboard/')) {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    return sharedConfig;
  },
};

export default config;
