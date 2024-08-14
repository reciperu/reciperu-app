import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || 'Sharely',
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
      bundleIdentifier: process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER || 'com.ryotanny.sharely-app',
      googleServicesFile: './GoogleService-Info.plist',
      usesAppleSignIn: true,
      buildNumber: new Date().getTime().toString(),
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
      package: process.env.ANDROID_PACKAGE || 'com.ryotanny.sharely-app',
    },
    plugins: [
      'expo-router',
      '@react-native-google-signin/google-signin',
      'expo-apple-authentication',
      [
        'expo-image-picker',
        {
          photosPermission: '$(PRODUCT_NAME)があなたの写真にアクセスすることを許可してください。',
          cameraPermission: '$(PRODUCT_NAME)がカメラにアクセスすることを許可してください。',
        },
      ],
    ],
    experiments: {
      tsconfigPaths: true,
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || '6f3dc8c2-c71e-4a23-98fc-287e3b3050df',
      },
    },
    scheme: process.env.EXPO_PUBLIC_SCHEME || 'sharely-app',
  };
};
