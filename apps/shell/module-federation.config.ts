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

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
