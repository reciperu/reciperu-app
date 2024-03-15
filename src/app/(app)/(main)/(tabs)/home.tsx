import { Image } from 'expo-image';
import { Tabs, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Constants } from '@/constants';
import { useFetchSpace } from '@/features/Space/apis/getSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

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
        {/* ユーザー情報 */}
        <View style={{ marginBottom: 48 }}>
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
        <Container needBottomPadding>
          {/* 今日の献立 */}
          <View style={{ marginBottom: 40 }}>
            <Flex style={{ gap: 8, alignItems: 'center' }}>
              <Image
                source={require('assets/menu_section_icon.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
              <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
                今日の献立
              </NotoText>
              <Spacer />
              <Pressable>
                <Flex style={{ gap: 4, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: Constants.colors.primitive.blue[400],
                      fontSize: 12,
                      textDecorationLine: 'underline',
                    }}>
                    すべての献立を見る
                  </Text>
                  <View style={{ transform: 'rotate(180deg)' }}>
                    <AppIcon
                      name="arrow-back"
                      color={Constants.colors.primitive.blue[400]}
                      width={12}
                      height={12}
                    />
                  </View>
                </Flex>
              </Pressable>
            </Flex>
          </View>
          {/* パートナーの食べたい料理 */}
          {/* 自分の食べたい料理 */}
          {/* 最近の献立 */}
          <View style={{ marginBottom: 40 }}>
            <Flex style={{ gap: 8, alignItems: 'center' }}>
              <Image
                source={require('assets/recent_recipe_section_logo.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
              <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
                最近の献立
              </NotoText>
              <Spacer />
              <Pressable>
                <Flex style={{ gap: 4, alignItems: 'center' }}>
                  <Text
                    style={{
                      color: Constants.colors.primitive.blue[400],
                      fontSize: 12,
                      textDecorationLine: 'underline',
                    }}>
                    もっと見る
                  </Text>
                  <View style={{ transform: 'rotate(180deg)' }}>
                    <AppIcon
                      name="arrow-back"
                      color={Constants.colors.primitive.blue[400]}
                      width={12}
                      height={12}
                    />
                  </View>
                </Flex>
              </Pressable>
            </Flex>
          </View>
        </Container>
      </View>
    </>
  );
}

// linear-gradient(180deg, #FFF5F7 0%, #FFF5F7 38.36%, #FED7E2 100%);
