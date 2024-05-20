import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/cores/components/Button';
import { NotoText } from '@/cores/components/Text';
import { Constants } from '@/constants';
import { noop } from '@/functions/utils';

export const SharingPromotionCard = memo(() => {
  return (
    <View style={styles.cardContainer}>
      <NotoText fw="bold" style={styles.cardTitle}>
        スペースにパートナーを招待しませんか？
      </NotoText>
      {/* // TODO: 後で検討 */}
      <View style={styles.cardActionButton}>
        <Button onPress={noop}>共有する</Button>
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
