import { memo, useCallback } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { RoadmapItem as Props } from '@/features/Roadmap/types';

export const RoadmapItem = memo<Props>((item) => {
  const getStatusLabel = useCallback((status: '対応中' | '未対応' | '対応済') => {
    if (status === '対応中') {
      return '開発中';
    }
    if (status === '未対応') {
      return '未対応';
    }
    if (status === '対応済') {
      return '対応済';
    }
  }, []);
  const getStatusColor = useCallback((status: '対応中' | '未対応' | '対応済') => {
    if (status === '対応中') {
      return '#48BB78';
    }
    if (status === '未対応') {
      return '#ECC94B';
    }
    if (status === '対応済') {
      return '#90CDF4';
    }
  }, []);
  return (
    <Flex
      key={item.id}
      style={{
        alignItems: 'center',
        padding: 12,
        gap: 12,
        backgroundColor: 'white',
        borderRadius: Constants.radius.lg,
      }}>
      <View style={{ flex: 1 }}>
        <NotoText style={{ fontSize: 14, lineHeight: 18 }}>{item.title}</NotoText>
        {item.description && (
          <NotoText
            style={{ fontSize: 12, color: Constants.colors.primitive.gray[500], marginTop: 6 }}>
            {item.description}
          </NotoText>
        )}
      </View>
      <Flex style={{ alignItems: 'center', gap: 4 }}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: getStatusColor(item.status[0]),
            borderRadius: 4,
          }}
        />
        <NotoText
          style={{
            fontSize: 12,
            lineHeight: 16,
            color: Constants.colors.primitive.gray[500],
          }}>
          {getStatusLabel(item.status[0])}
        </NotoText>
      </Flex>
    </Flex>
  );
});
