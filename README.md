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
