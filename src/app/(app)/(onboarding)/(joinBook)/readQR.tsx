import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PageWholeLoader } from '@/cores/components/PageWholeLoader';
import { NotoText } from '@/cores/components/Text';

export default function OnboardingJoinBookReadQRPage() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    console.log(data);
    // TODO: QRコードのデータを取得して、それを元にレシピ集に参加する
    router.push('/(onboarding)/(joinBook)/complete');
  };

  if (hasPermission === null) {
    return <PageWholeLoader />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        {/* // TODO: UIアップデート */}
        <NotoText>カメラの利用を許可してください</NotoText>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: '',
            headerShadowVisible: false,
          }}
        />
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 50 },
});
