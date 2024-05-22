import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Constants } from '@/constants';

export const PendingLoader = memo(() => {
  return (
    <View style={{ paddingTop: 40 }}>
      <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
    </View>
  );
});
