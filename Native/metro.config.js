const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: './app/globals.css' });

module.exports = {
  ...nativeWindConfig,
  resolver: {
    ...nativeWindConfig.resolver,
    sourceExts: [...nativeWindConfig.resolver.sourceExts, 'mjs'],
  },
  server: {
    port: 8081,
    host: '0.0.0.0',
    enableDebugger: true,
  },
  maxWorkers: 2,
};