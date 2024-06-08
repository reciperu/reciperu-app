import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { PlannedMenuSection } from '@/features/Home/components/PlannedMenuSection';
import { UserEatingListSection } from '@/features/Home/components/UserEatingListSection';
import { UserIconList } from '@/features/Home/components/UserIconList';
import { useFetchSpace } from '@/features/Space/apis/getSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const { data } = useFetchMyProfile({});
  const { data: space } = useFetchSpace({
    id: data?.spaceId || '',
  });
  const myProfile = useMemo(() => {
    const id = data?.id || '';
    const targetUser = space?.users.find((user) => user.id === id) || null;
    return targetUser;
  }, [data, space]);
  const partnerProfile = useMemo(() => {
    const id = data?.id || '';
    const targetUser = space?.users.find((user) => user.id !== id) || null;
    return targetUser;
  }, [data, space]);
  const imageHeight = (width / 390) * 103;
  const spaceName = useMemo(() => {
    return space?.name || '';
  }, [space]);
  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: spaceName,
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: Constants.colors.primitive.pink['50'] }}>
        {/* ユーザー情報 */}
        <View style={{ paddingBottom: 48, backgroundColor: 'white' }}>
          <LinearGradient
            colors={['#FFF5F7', '#FED7E2']}
            style={{ width: '100%', height: imageHeight }}>
            <Image
              source={require('assets/home-decoration.png')}
              style={{ width: '100%', height: imageHeight, marginTop: 8 }}
              contentFit="contain"
            />
          </LinearGradient>
          <View style={{ marginTop: -24 }}>
            <UserIconList myProfile={myProfile} partnerProfile={partnerProfile} />
          </View>
        </View>
        <Container needBottomPadding>
          {/* 計画中の献立 */}
          <View style={{ marginBottom: 72 }}>
            <PlannedMenuSection />
          </View>
          {/* パートナーの食べたい料理 */}
          {/* 自分の食べたい料理 */}
          <View>
            <UserEatingListSection
              avatar={data?.imageUrl}
              name={data?.name}
              list={[]}
              loading={false}
              type="mine"
            />
          </View>
        </Container>
      </ScrollView>
    </>
  );
}
