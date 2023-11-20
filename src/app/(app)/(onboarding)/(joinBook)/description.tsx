import { Stack, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';

export default function OnboardingJoinBookTopPage() {
  return (
    <>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Text fw="bold" style={styles.pageTitle}>
          料理本を共有してもらいましょう
        </Text>
        <View style={styles.contentWrapper}>
          <Text style={[styles.descriptionText, { marginBottom: 8 }]}>料理本の共有には</Text>
          <Text style={styles.descriptionText}>1. QRコードを読み取る</Text>
          <Text style={styles.descriptionText}>2. 招待リンクからアプリを開く</Text>
          <Text style={[styles.descriptionText, { marginTop: 8 }]}>
            のどちらかを行う必要があります
          </Text>
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={() => router.push('/(onboarding)/(joinBook)/readQR')}>
            QRコードを読み取る
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 50 },
  pageTitle: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  contentWrapper: { marginTop: 36 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  descriptionText: { fontSize: 16 },
});
