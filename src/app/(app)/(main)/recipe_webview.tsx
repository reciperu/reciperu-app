import { Stack, router, useLocalSearchParams } from 'expo-router';

import WebView from 'react-native-webview';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';

export default function RecipeWebviewPage() {
  const isPresented = router.canGoBack();
  const params = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          title: typeof params.title === 'string' ? params.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => <></>,
          presentation: 'modal',
        }}
      />
      <WebView
        source={{ uri: typeof params.recipeUrl === 'string' ? params.recipeUrl : '' }}
        style={{ flex: 1 }}
      />
    </>
  );
}
