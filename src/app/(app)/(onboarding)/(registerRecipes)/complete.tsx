import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { noop } from 'swr/_internal';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';

import { Constants } from '@/constants';
import { NotoText } from '@/components/ui/Text';

const Dec01Image = require('assets/dec_01.webp') as string;

export default function OnboardingRegisterRecipesCompletePage() {
  const { height } = useWindowDimensions();
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={{ minHeight: height - 144 }}>
        <View style={styles.titleWrapper}>
          <NotoText fw="bold" style={styles.pageTitle}>
            レシピルを利用する準備が完了しました！
          </NotoText>
        </View>
        <View style={styles.cardContainer}>
          <NotoText fw="bold" style={styles.cardTitle}>
            あなたの料理本を誰かと共有しませんか？
          </NotoText>
          {/* // TODO: 後で検討 */}
          <View style={styles.cardActionButton}>
            <Button onPress={noop}>共有する</Button>
          </View>
          <Image
            contentFit="contain"
            source={Dec01Image}
            style={{
              width: '100%',
              height: 75,
            }}
          />
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={() => router.push('/(tabs)/home')}>さっそく始める</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 50,
    display: 'flex',
    backgroundColor: 'white',
  },
  titleWrapper: {
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: 'center',
  },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  cardContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: Constants.colors.primitive.gray[50],
    borderRadius: Constants.radius['lg'],
    marginTop: 24,
  },
  cardTitle: { fontSize: 14, textAlign: 'center' },
  cardActionButton: { marginTop: 12, marginBottom: 12 },
});
