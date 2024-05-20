import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, memo, useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuthContext } from '@/context/authProvider';
import { PageWholeLoader } from '@/cores/components/PageWholeLoader';

import { ReactQueryClientProvider } from '@/providers/ReactQuery';
import { toastConfig } from '@/lib/ToastConfig';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'LINE-bold': require('assets/fonts/LINESeedJP_A_OTF_Bd.otf'),
    'LINE-extra-bold': require('assets/fonts/LINESeedJP_A_OTF_Eb.otf'),
    'LINE-regular': require('assets/fonts/LINESeedJP_A_OTF_Rg.otf'),
    'LINE-light': require('assets/fonts/LINESeedJP_A_OTF_Th.otf'),
    'noto-sans-regular': require('assets/fonts/NotoSansJP-Regular.ttf'),
    'noto-sans-bold': require('assets/fonts/NotoSansJP-Bold.ttf'),
    'noto-sans-black': require('assets/fonts/NotoSansJP-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <BottomSheetModalProvider>
          <GestureHandlerRootView style={{ flex: 1, flexGrow: 1 }}>
            <View onLayout={onLayoutRootView}>
              <WholeLayout>
                <Slot />
              </WholeLayout>
            </View>
          </GestureHandlerRootView>
          <Toast config={toastConfig} />
        </BottomSheetModalProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

const WholeLayout = memo<PropsWithChildren>(({ children }) => {
  const authContext = useAuthContext();
  if (!authContext.initialize) {
    return <PageWholeLoader />;
  }
  return <>{children}</>;
});
