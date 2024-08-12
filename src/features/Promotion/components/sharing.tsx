import { Image } from 'expo-image';
import { memo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

const { width } = Dimensions.get('window');

export const SharingPromotionCard = memo(() => {
  const imgWidth = width - 64;
  const imgHeight = (imgWidth * 150) / 714;
  return (
    <View style={styles.cardContainer}>
      <NotoText fw="bold" style={styles.cardTitle}>
        パートナーを招待しませんか？
      </NotoText>
      <View style={{ marginTop: 24, marginBottom: 12 }}>
        <NotoText>パートナーを招待すると...</NotoText>
        <Flex style={{ gap: 8, marginTop: 12 }}>
          <View style={{ marginTop: 2 }}>
            <AppIcon
              name="check-mark"
              width={18}
              height={18}
              color={Constants.colors.primitive.pink[400]}
            />
          </View>
          <NotoText>同じレシピを見ることができます！</NotoText>
        </Flex>
        <Flex style={{ gap: 8, marginTop: 12 }}>
          <View style={{ marginTop: 2 }}>
            <AppIcon
              name="check-mark"
              width={18}
              height={18}
              color={Constants.colors.primitive.pink[400]}
            />
          </View>
          <NotoText>食べたい料理をお互いに共有することができます！</NotoText>
        </Flex>
      </View>
      <Flex style={{ justifyContent: 'center' }}>
        <Image
          contentFit="contain"
          source={require('assets/dec_01.webp')}
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </Flex>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: Constants.colors.primitive.gray[50],
    borderRadius: Constants.radius['lg'],
  },
  cardTitle: { fontSize: 16, textAlign: 'center', color: Constants.colors.primitive.gray[600] },
  cardActionButton: { marginTop: 12, marginBottom: 12 },
});
