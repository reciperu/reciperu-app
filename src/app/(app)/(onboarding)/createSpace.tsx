import { Stack, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { OnboardingCarousel } from '@/features/Onboarding/Carousel';
const Instruction01 = require('assets/instructions/instruction-1.webp') as string;
const Instruction02 = require('assets/instructions/instruction-2.webp') as string;
const Instruction03 = require('assets/instructions/instruction-3.webp') as string;

const CAROUSEL_DATA = [
  {
    image: Instruction01,
    title: 'あなただけの料理本を作ることができます',
  },
  {
    image: Instruction02,
    title: `料理本を共有しているユーザーに
食べたい料理をアプリ内で簡単に提案できます`,
  },
  {
    image: Instruction03,
    title: `作った料理を1分で登録！
簡単に登録できるので継続できます`,
  },
];

export default function OnboardingCreateSpacePage() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.stepper}>2/4</Text>
          <Text fw="bold" style={styles.pageTitle}>
            次に、あなたの料理本を作成しましょう
          </Text>
        </View>
        <OnboardingCarousel data={CAROUSEL_DATA} />
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={() => router.push('/(onboarding)/(createBook)/title')}>
            新しく料理本を作成する
          </Button>
          <Button
            variant="others"
            onPress={() => router.push('/(onboarding)/(joinBook)/description')}>
            他の人が作った料理本を見る
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingBottom: 50 },
  titleWrapper: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 40,
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
  checkListWrapper: {
    justifyContent: 'center',
  },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    gap: 16,
  },
});
