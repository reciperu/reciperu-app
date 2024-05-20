# レシピル

## 環境構築

1. local用のenvファイル作成

```bash
cp .env.local.template .env.local
cp .env.local.template .env.dev.local
cp .env.local.template .env.prd.local
```

2. envの機密情報の入力

情報は開発担当に問い合わせください

## npmコマンド

```bash
# iOS
# - 開発向けビルド
yarn ios:dev
# - 本番向けビルド
yarn ios:prd
# Android
# - 開発向けビルド
yarn android:dev
# - 本番向けビルド
yarn android:prd
```

memo:
https://medium.com/nerd-for-tech/apple-google-authentication-in-expo-apps-using-firebase-997125440032

## error対応

### iosでビルドに失敗する

ビルド時に以下のエラーが発生する

```
❌  (/Users/matsumotoryouta/work/projects/reciperu/reciperu-app/node_modules/react-native-flipper/ios/FlipperReactNativeJavaScriptPlugin.h:9:9)

  7 |
  8 | #if defined(DEBUG) || defined(FB_SONARKIT_ENABLED)
>  9 | #import <FlipperKit/FlipperConnection.h>
    |         ^ 'FlipperKit/FlipperConnection.h' file not found
 10 | #import <FlipperKit/FlipperPlugin.h>
 11 |
 12 | NS_ASSUME_NONNULL_BEGIN
```

#### 解決方法

iosフォルダ直下で以下を実行

```
NO_FLIPPER=1 pod install
```

その後、ビルド
