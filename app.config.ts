import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: config.name || 'レシピル',
    slug: config.slug || 'reciperu-app',
    icon:
      process.env.NODE_ENV === 'development' ? './assets/dev/icon.png' : './assets/prd/icon.png',
    android: {
      ...config.android,
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        foregroundImage:
          process.env.NODE_ENV === 'development'
            ? './assets/dev/adaptive-icon.png'
            : './assets/prd/adaptive-icon.png',
      },
    },
  };
};
