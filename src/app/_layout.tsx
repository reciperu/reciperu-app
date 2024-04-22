import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, memo, useCallback } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { SWRConfig } from 'swr';

import { Constants } from '@/constants';
import { AuthProvider, useAuthContext } from '@/context/authProvider';
import { PageWholeLoader } from '@/cores/components/PageWholeLoader';
import { NotoText } from '@/cores/components/Text';
import { ToastWrapper } from '@/cores/components/Toast';
import { AppIcon } from '@/cores/components/icons';
import { client } from '@/lib/axios';

SplashScreen.preventAutoHideAsync();

// NOTE: 設定の置く場所を後で変える
export const toastConfig: ToastConfig = {
  successToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.green[300] }}>
      <AppIcon
        name="check-mark"
        width={18}
        height={18}
        color={Constants.colors.primitive.green[500]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  errorToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.red[300] }}>
      <AppIcon name="alert" width={18} height={18} color={Constants.colors.primitive.red[500]} />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  warningToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.orange[300] }}>
      <AppIcon
        name="warning"
        width={18}
        height={18}
        color={Constants.colors.primitive.orange[400]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  infoToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.blue[300] }}>
      <AppIcon
        name="info-circle"
        width={18}
        height={18}
        color={Constants.colors.primitive.blue[500]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
};

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
    <AuthProvider>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (url) => {
            return client(url).then((res) => res.data);
          },
          onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // リトライを行わない
            console.error(error);
          },
          provider: () => new Map(),
          isVisible: () => {
            return true;
          },
          initFocus(callback) {
            let appState = AppState.currentState;

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              /* If it's resuming from background or inactive mode to active one */
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback();
              }
              appState = nextAppState;
            };

            // Subscribe to the app state change events
            const subscription = AppState.addEventListener('change', onAppStateChange);

            return () => {
              subscription.remove();
            };
          },
        }}>
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
      </SWRConfig>
    </AuthProvider>
  );
}

const WholeLayout = memo<PropsWithChildren>(({ children }) => {
  const authContext = useAuthContext();
  if (!authContext.initialize) {
    return <PageWholeLoader />;
  }
  return <>{children}</>;
});
