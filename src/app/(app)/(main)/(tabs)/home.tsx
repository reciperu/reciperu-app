import { Image } from 'expo-image';
import { Tabs, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Constants } from '@/constants';
import { useFetchSpace } from '@/features/Space/apis/getSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { Flex } from '@/features/chore/Flex';
import { NotoText } from '@/features/chore/Text';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const { data } = useFetchMyProfile();
  const { data: space } = useFetchSpace(data?.spaceId || '');
  const router = useRouter();
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View>
          <LinearGradient
            colors={['#FFF5F7', '#FED7E2']}
            style={{ width: '100%', height: imageHeight }}>
            <Image
              source={require('assets/home-decoration.png')}
              style={{ width: '100%', height: imageHeight, marginTop: 8 }}
              contentFit="contain"
            />
          </LinearGradient>
          <Flex
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              // position: 'absolute',
              // top: 0,
              // left: 0,
              width: '100%',
              gap: 64,
              marginTop: -40,
            }}>
            {/* 自分 */}
            <Pressable onPress={() => router.push('/myPage')}>
              <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Image
                  source={data?.imageUrl}
                  style={{ width: 48, height: 48, borderRadius: 24 }}
                />
                <NotoText fw="bold" style={{ fontSize: 12, textAlign: 'center' }}>
                  あなた
                </NotoText>
              </Flex>
            </Pressable>
            {/* パートナー */}
            {/* いない場合 */}
            {/* // TODO: ここ後で実装 */}
            <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Image
                source={require('assets/noUserIcon.png')}
                style={{ width: 48, height: 48, borderRadius: 24 }}
              />
              <NotoText
                fw="bold"
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: Constants.colors.primitive.gray[500],
                }}>
                招待する
              </NotoText>
            </Flex>
          </Flex>
        </View>
      </View>
    </>
  );
}

// linear-gradient(180deg, #FFF5F7 0%, #FFF5F7 38.36%, #FED7E2 100%);
