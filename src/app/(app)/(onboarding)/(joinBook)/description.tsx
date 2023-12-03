import { Stack, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';

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
        <View style={styles.titleWrapper}>
          <Text style={styles.stepper}>3/4</Text>
          <Text fw="bold" style={styles.pageTitle}>
            料理本を共有してもらいましょう
          </Text>
        </View>
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
  titleWrapper: {
    marginTop: 8,
  },
  stepper: {
    fontSize: 12,
    color: Constants.colors.primitive['black alpha'][600],
  },
  pageTitle: {
    fontSize: 18,
  },
  contentWrapper: { marginTop: 36 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  descriptionText: { fontSize: 16 },
});
