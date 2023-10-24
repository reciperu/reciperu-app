import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: config.name || 'レシピル',
    slug: config.slug || 'reciperu-app',
    icon: process.env.APP_ENV === 'production' ? './assets/prd/icon.png' : './assets/dev/icon.png',
    android: {
      ...config.android,
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        foregroundImage:
          process.env.APP_ENV === 'production'
            ? './assets/prd/adaptive-icon.png'
            : './assets/dev/adaptive-icon.png',
      },
    },
  };
};
