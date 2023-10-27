import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { AppState, AppStateStatus, View } from 'react-native';
import { SWRConfig } from 'swr';

import { AuthProvider } from '@/context/authProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'LINE-bold': require('assets/fonts/LINESeedJP_A_OTF_Bd.otf'),
    'LINE-extra-bold': require('assets/fonts/LINESeedJP_A_OTF_Eb.otf'),
    'LINE-regular': require('assets/fonts/LINESeedJP_A_OTF_Rg.otf'),
    'LINE-light': require('assets/fonts/LINESeedJP_A_OTF_Th.otf'),
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
        <View onLayout={onLayoutRootView}>
          <Slot />
        </View>
      </SWRConfig>
    </AuthProvider>
  );
}
