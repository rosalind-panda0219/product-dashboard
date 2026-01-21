import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * Remote micro-frontends that will be loaded by this shell
   */
  remotes: ['product-list', 'product-details'],
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

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
