import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Confetti from 'react-native-confetti';

import { APP_NAME } from '@/constants';
import { Button } from '@/cores/components/Button';
import { useModal } from '@/cores/components/Modal/useModal';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { SharingPromotionCard } from '@/features/Promotion/components/sharing';
import { InviteModal } from '@/features/Space/components/InviteModal';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { usePatchMyProfile } from '@/features/User/apis/patchMyProfile';
import { UserStatus } from '@/features/User/types';

const { height, width } = Dimensions.get('window');

export default function OnboardingRegisterRecipesCompletePage() {
  const queryClient = useQueryClient();
  const { isVisible, closeModal, openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const confettiRef = useRef<Confetti>(null);
  const router = useRouter();
  const mutation = usePatchMyProfile({});
  const { data } = useFetchMyProfile({});
  const handleStart = useCallback(async () => {
    if (data) {
      setLoading(true);
      mutation.mutate(
        {
          id: data.id,
          data: {
            name: data.name,
            imageUrl: data.imageUrl,
            activeStatus: UserStatus.JOINED_SPACE,
          },
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(['profile'], (data: any) => {
              if (data) {
                return {
                  ...data,
                  name: data.name,
                  imageUrl: data.imageUrl,
                  activeStatus: UserStatus.JOINED_SPACE,
                };
              }
              return {
                name: data.name,
                imageUrl: data.imageUrl,
                activeStatus: UserStatus.JOINED_SPACE,
              };
            });
            queryClient.invalidateQueries({
              queryKey: ['spaces', data.spaceId],
            });
            router.push('/(main)/(tabs)/home');
          },
          onSettled: () => {
            setLoading(false);
          },
        }
      );
    }
  }, [data, router, mutation, queryClient]);

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
    <>
      <ScrollView style={styles.container}>
        <View style={{ minHeight: height - 144 }}>
          <View style={styles.titleWrapper}>
            <NotoText fw="bold" style={styles.pageTitle}>
              {APP_NAME}を利用する準備が完了しました！
            </NotoText>
          </View>
          <SharingPromotionCard />
          <Spacer />
          <View style={styles.actionButtonWrapper}>
            <Button onPress={openModal} loading={loading}>
              招待する
            </Button>
            <Button onPress={handleStart} scheme="text" loading={loading}>
              招待せず始める
            </Button>
          </View>
        </View>
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: -40, left: 0, width, height }}>
          <Confetti ref={confettiRef} />
        </View>
      </ScrollView>
      <InviteModal
        isVisible={isVisible}
        onClose={closeModal}
        renderPrimaryButton={() => (
          <View style={{ marginTop: 24 }}>
            <Button onPress={handleStart} loading={loading}>
              パートナーが参加しました
            </Button>
          </View>
        )}
      />
    </>
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
