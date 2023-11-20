import { Stack, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';

export default function OnboardingJoinBookCompletePage() {
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
          {/* // TODO: ユーザー名 */}
          ありがとうございます！{'\n'}ハナコさんと一緒に料理本を作りましょう🎉
        </Text>
        <Spacer />
        {/* // TODO: チェックリスト */}
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
