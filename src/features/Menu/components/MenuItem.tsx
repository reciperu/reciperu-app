import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { View } from 'react-native';

import { MenuItem } from '../types';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import dayjs from '@/lib/dayjs';

interface Props {
  data: MenuItem;
}

export const CompactMenuItem = memo<Props>(({ data }) => {
  console.log(`date: ${dayjs(data.scheduledAt).format('YYYY/MM/DD')}`);
  const renderMark = useCallback(() => {
    const scheduledAt = dayjs(data.scheduledAt);
    // 今日の場合
    if (scheduledAt.isSame(dayjs(), 'day')) {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Constants.colors.primitive.green[400],
            justifyContent: 'center',
          }}>
          <NotoText fw="black" style={{ fontSize: 9, color: 'white', textAlign: 'center' }}>
            今日の
          </NotoText>
          <NotoText
            fw="black"
            style={{ fontSize: 9, color: 'white', textAlign: 'center', marginTop: -2 }}>
            献立
          </NotoText>
        </View>
      );
    }
    // 明日の場合
    if (scheduledAt.isSame(dayjs().add(1, 'day'), 'day')) {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Constants.colors.primitive.blue[400],
            justifyContent: 'center',
          }}>
          <NotoText fw="black" style={{ fontSize: 9, color: 'white', textAlign: 'center' }}>
            明日の
          </NotoText>
          <NotoText
            fw="black"
            style={{ fontSize: 9, color: 'white', textAlign: 'center', marginTop: -2 }}>
            献立
          </NotoText>
        </View>
      );
    }
    // それ以外の場合
    return (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: Constants.colors.primitive.gray[50],
          justifyContent: 'center',
        }}>
        <NotoText
          fw="black"
          style={{
            fontSize: 12,
            color: Constants.colors.primitive.gray[500],
            textAlign: 'center',
          }}>
          {scheduledAt.format('M/D')}
        </NotoText>
        <NotoText
          fw="black"
          style={{ fontSize: 9, color: Constants.colors.primitive.gray[400], textAlign: 'center' }}>
          予定
        </NotoText>
      </View>
    );
  }, [data.scheduledAt]);
  return (
    <Flex style={{ gap: 8, alignItems: 'center' }}>
      {renderMark()}
      <Image
        source={data.recipe.thumbnailUrl}
        style={{ width: 48, height: 48, borderRadius: Constants.radius.lg }}
      />
      <View style={{ flex: 1 }}>
        <NotoText style={{ fontSize: 14 }} numberOfLines={2}>
          {data.recipe.title}
        </NotoText>
        <Flex style={{ alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Image source={data.recipe.faviconUrl} style={{ width: 12, height: 12 }} />
          <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray['600'] }}>
            {data.recipe.appName}
          </NotoText>
        </Flex>
      </View>
    </Flex>
  );
});
