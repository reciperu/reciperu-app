import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';

export const HeaderAppIcon = memo(() => {
  const router = useRouter();
  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(app)/(main)/(tabs)/home');
  }, [router]);
  return (
    <Pressable onPress={handlePress}>
      <Image source={require('assets/logo-horizon.svg')} style={{ width: 62, height: 20 }} />
    </Pressable>
  );
});
