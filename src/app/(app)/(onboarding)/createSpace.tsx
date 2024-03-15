import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { OnboardingCarousel } from '@/features/Onboarding/components/Carousel';
import { Button } from '@/cores/components/Button';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
const Instruction01 = require('assets/instructions/instruction-1.png') as string;
const Instruction02 = require('assets/instructions/instruction-2.png') as string;
const Instruction03 = require('assets/instructions/instruction-3.png') as string;
const Instruction04 = require('assets/instructions/instruction-4.png') as string;

const CAROUSEL_DATA = [
  {
    image: Instruction01,
    title: `スペースとは、あなたとパートナーだけの
プライベートな空間です`,
  },
  {
    image: Instruction02,
    title: `スペースでは２人だけのレシピ集を
作ることができます`,
  },
  {
    image: Instruction03,
    title: `同じスペースに所属しているパートナーと
食べたい料理を共有、提案することができます`,
  },
  {
    image: Instruction04,
    title: `作った料理を1分で登録！
簡単に登録できるので継続できます`,
  },
];

export default function OnboardingCreateSpacePage() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>2/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            次に、あなたのスペースを作成しましょう
          </NotoText>
        </View>
        <OnboardingCarousel data={CAROUSEL_DATA} />
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={() => router.push('/(onboarding)/(createBook)/title')}>
            新しくスペースを作成する
          </Button>
          <Button
            variant="others"
            onPress={() => router.push('/(onboarding)/(joinBook)/description')}>
            他の人が作ったスペースに参加する
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
