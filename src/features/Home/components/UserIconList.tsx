import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { SpaceUser } from '@/features/User/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Pressable } from 'react-native';

interface Props {
  myProfile: SpaceUser | null;
  partnerProfile: SpaceUser | null;
}

export const UserIconList = memo<Props>(({ myProfile, partnerProfile }) => {
  const router = useRouter();
  return (
    <Flex
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        gap: 64,
      }}>
      {/* 自分 */}
      {Boolean(myProfile) && (
        <Pressable onPress={() => router.push('/myPage')}>
          <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Image
              source={myProfile?.imageUrl}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <NotoText fw="bold" style={{ fontSize: 12, textAlign: 'center' }}>
              あなた
            </NotoText>
          </Flex>
        </Pressable>
      )}
      {/* パートナー */}
      {/* いない場合 */}
      {partnerProfile ? (
        <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Image
            source={partnerProfile.imageUrl}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
          <NotoText fw="bold" style={{ fontSize: 12, textAlign: 'center' }}>
            パートナー
          </NotoText>
        </Flex>
      ) : (
        // TODO: ここ後で実装
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
      )}
    </Flex>
  );
});
