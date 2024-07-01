import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

export const SharingPromotionCard = memo(() => {
  return (
    <View style={styles.cardContainer}>
      <NotoText fw="bold" style={styles.cardTitle}>
        スペースにパートナーを招待しませんか？
      </NotoText>
      <View style={{ marginVertical: 24 }}>
        <NotoText>パートナーを招待すると...</NotoText>
        <Flex style={{ gap: 8, marginTop: 12 }}>
          <AppIcon name="check-mark" color={Constants.colors.primitive.pink[400]} />
          <NotoText fw="bold">同じレシピを見ることができます！</NotoText>
        </Flex>
        <Flex style={{ gap: 8, marginTop: 12 }}>
          <AppIcon name="check-mark" color={Constants.colors.primitive.pink[400]} />
          <NotoText fw="bold">食べたい料理をお互いに共有することができます！</NotoText>
        </Flex>
      </View>
      <Image
        contentFit="contain"
        source={require('assets/dec_01.webp')}
        style={{
          width: '100%',
          height: 75,
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: Constants.colors.primitive.gray[50],
    borderRadius: Constants.radius['lg'],
  },
  cardTitle: { fontSize: 14, textAlign: 'center' },
  cardActionButton: { marginTop: 12, marginBottom: 12 },
});
