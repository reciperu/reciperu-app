import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || 'Sharely（dev）',
    slug: process.env.EXPO_PUBLIC_SCHEME || 'sharely-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      // 環境変数からバンドル識別子を取得
      bundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER || 'com.ryotanny.reciperu-app-develop',
      googleServicesFile: './GoogleService-Info.plist',
      infoPlist: {
        CFBundleLocalizations: ['ja_JP'],
        CFBundleDevelopmentRegion: 'ja_JP',
      },
    },
    android: {
      ...config.android,
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        foregroundImage: './assets/adaptive-icon.png',
      },
      googleServicesFile: './google-services.json',
      package: process.env.ANDROID_PACKAGE || 'com.ryotanny.reciperu-dev',
    },
    plugins: [
      'expo-router',
      '@react-native-google-signin/google-signin',
      [
        'expo-image-picker',
        {
          photosPermission: '$(PRODUCT_NAME)があなたの写真にアクセスすることを許可してください。',
          cameraPermission: '$(PRODUCT_NAME)がカメラにアクセスすることを許可してください。',
        },
      ],
      [
        'expo-barcode-scanner',
        {
          cameraPermission: '$(PRODUCT_NAME)がカメラにアクセスすることを許可してください。',
        },
      ],
    ],
    experiments: {
      tsconfigPaths: true,
    },
    scheme: process.env.EXPO_PUBLIC_SCHEME,
  };
};
