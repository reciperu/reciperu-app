import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { Constants } from '@/constants';

export default function OnboardingJoinBookTopPage() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>3/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            料理本を共有してもらいましょう
          </NotoText>
        </View>
        <View style={styles.contentWrapper}>
          <NotoText style={[styles.descriptionText, { marginBottom: 8 }]}>
            料理本の共有には
          </NotoText>
          <View style={styles.colorBox}>
            <NotoText style={styles.descriptionText}>1. QRコードを読み取る</NotoText>
            <NotoText style={styles.descriptionText}>2. 招待リンクからアプリを開く</NotoText>
          </View>
          <NotoText style={[styles.descriptionText, { marginTop: 8 }]}>
            のどちらかを行う必要があります
          </NotoText>
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
    fontSize: 14,
    color: Constants.colors.primitive['black alpha'][600],
  },
  pageTitle: {
    fontSize: 18,
    marginVertical: 2,
  },
  contentWrapper: { marginTop: 36 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  descriptionText: { fontSize: 16 },
  colorBox: {
    backgroundColor: '#EDF2F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
