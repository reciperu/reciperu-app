import { Constants } from '@/constants';
import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

export const PendingLoader = memo(() => {
  return (
    <View style={{ paddingTop: 40 }}>
      <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
    </View>
  );
});
