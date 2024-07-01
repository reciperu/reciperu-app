import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { useModal } from '@/cores/components/Modal/useModal';
import { NotoText } from '@/cores/components/Text';
import { InviteModal } from '@/features/Space/components/InviteModal';

export const NoPartnerIcon = memo(() => {
  const { isVisible, closeModal, openModal } = useModal();
  return (
    <>
      <Pressable onPress={openModal}>
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
      </Pressable>
      <InviteModal isVisible={isVisible} onClose={closeModal} />
    </>
  );
});
