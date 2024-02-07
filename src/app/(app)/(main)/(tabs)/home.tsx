import { Dimensions, Pressable, View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { SharingPromotionCard } from '@/components/feature/Promotion/Sharing';
import { Tabs, useRouter } from 'expo-router';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { useMemo } from 'react';
import { Image } from 'expo-image';
import LinearGradient from 'react-native-linear-gradient';
import { Constants } from '@/constants';
import { Flex } from '@/components/ui/Flex';
import { NotoText } from '@/components/ui/Text';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const { data } = useFetchMyProfile();
  const router = useRouter();
  const imageHeight = (width / 390) * 103;
  // TODO: スペース名
  const spaceName = useMemo(() => {
    return data?.name || '';
  }, [data]);
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
                  {data?.name || ''}
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
