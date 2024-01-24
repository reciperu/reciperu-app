import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Confetti from 'react-native-confetti';

import { SharingPromotionCard } from '@/components/feature/Promotion/Sharing';
import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';
import { usePatchMyProfile } from '@/features/Users/apis/patchMyProfile';
import { UserStatus } from '@/features/Users/types';

const { height, width } = Dimensions.get('window');

export default function OnboardingRegisterRecipesCompletePage() {
  const [loading, setLoading] = useState(false);
  const confettiRef = useRef<Confetti>(null);
  const router = useRouter();
  const { updateProfile } = usePatchMyProfile();
  const { data } = useFetchMyProfile();
  const handleStart = useCallback(async () => {
    if (data) {
      setLoading(true);
      await updateProfile(data.id, {
        name: data.name,
        imageUrl: data.imageUrl,
        activeStatus: UserStatus.JOINED_SPACE,
      });
      router.push('/(main)/(tabs)/home');
      setLoading(false);
    }
  }, [data, router, updateProfile]);

  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current.startConfetti();
    }
    return () => {
      if (confettiRef.current) {
        confettiRef.current.stopConfetti();
      }
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ position: 'absolute', top: -40, left: 0, width, height }}>
        <Confetti ref={confettiRef} bsize={0} untilStopped />
      </View>
      <View style={{ minHeight: height - 144 }}>
        <View style={styles.titleWrapper}>
          <NotoText fw="bold" style={styles.pageTitle}>
            {APP_NAME}を利用する準備が完了しました！
          </NotoText>
        </View>
        <SharingPromotionCard />
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={handleStart} loading={loading}>
            さっそく始める
          </Button>
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
    marginBottom: 24,
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
});
