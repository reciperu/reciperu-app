import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppIcon } from '@/cores/components/icons';

interface Props {
  onPress: () => void;
}

export const FloatingButton = memo<Props>(({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          shadowColor: '#666',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 16,
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0, 0.6, 1]}
          style={{
            padding: 12,
            borderRadius: 24,
          }}
          colors={['#FF8753', '#ED64A6', '#ED64A6']}>
          <AppIcon name="add" color="#FFFFFF" />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
});
