import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Confetti from 'react-native-confetti';
import { Path, Svg } from 'react-native-svg';

import { Button } from '@/cores/components/Button';
import { Flex } from '@/cores/components/Flex';
import { PageWholeLoader } from '@/cores/components/PageWholeLoader';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { useFetchSpace } from '@/features/Space/apis/getSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const { height, width } = Dimensions.get('window');

export default function OnboardingJoinBookCompletePage() {
  const { data: profile } = useFetchMyProfile({});
  const { data: space } = useFetchSpace({
    id: profile?.spaceId,
  });
  const confettiRef = useRef<Confetti>(null);
  const ownerInfo = useMemo(() => {
    if (profile && space) {
      const owner = space.users.find((user) => user.id !== profile.id);
      if (owner) {
        return owner;
      }
    }
    return null;
  }, [profile, space]);

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

  if (!space) {
    return (
      <View style={styles.container}>
        <PageWholeLoader />;
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <NotoText fw="bold" style={styles.pageTitle}>
        「{space?.name}」に参加しました！{'\n'}
        {ownerInfo?.name}さんと一緒に献立を考えましょう🎉
      </NotoText>
      <Spacer />
      <Flex style={{ justifyContent: 'center' }}>
        <View style={{ position: 'relative', margin: 'auto' }}>
          <HomeSvg />
          <Flex
            style={{
              gap: 24,
              position: 'absolute',
              top: '35%',
              left: 0,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Flex style={styles.userIconWrapper}>
              <Image source={profile?.imageUrl} style={styles.userIcon} />
              <NotoText fw="bold" style={{ fontSize: 12, textAlign: 'center' }}>
                {profile?.name}
              </NotoText>
            </Flex>
            <Flex style={styles.userIconWrapper}>
              <Image source={ownerInfo?.imageUrl} style={styles.userIcon} />
              <NotoText fw="bold" style={{ fontSize: 12, textAlign: 'center' }}>
                {ownerInfo?.name}
              </NotoText>
            </Flex>
          </Flex>
        </View>
      </Flex>
      <Spacer />
      <View style={styles.actionButtonWrapper}>
        <Button onPress={() => router.push('/(main)/(tabs)/home')}>さっそく始める</Button>
      </View>
      <View pointerEvents="none" style={{ position: 'absolute', top: -40, left: 0, width, height }}>
        <Confetti ref={confettiRef} />
      </View>
    </View>
  );
}

const HomeSvg = () => {
  return (
    <Svg width="256" height="174" viewBox="0 0 256 174" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M247.155 57.6892C252.576 60.3994 256 65.9396 256 72L256 73.9512V86.1115V173.951H0V86.1115V73.9512V72C0 65.9396 3.42404 60.3994 8.84458 57.6892L120.845 1.68917C125.349 -0.563055 130.651 -0.563055 135.155 1.68917L247.155 57.6892Z"
        fill="#FFF4FD"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 24 },
  pageTitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  userIconWrapper: { flexDirection: 'column', alignItems: 'center', gap: 4 },
  userIcon: { width: 48, height: 48, borderRadius: 24 },
  contentWrapper: { marginTop: 36 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  descriptionText: { fontSize: 16 },
});
