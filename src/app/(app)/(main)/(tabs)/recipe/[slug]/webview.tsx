import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Constants } from '@/constants';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import WebView from 'react-native-webview';

export default function Modal() {
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

const styles = StyleSheet.create({
  headerUpdateButton: { color: Constants.colors.primitive.blue[400], fontSize: 16 },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
