import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import { Flex } from '../Flex';
import { AppIcon } from '../icons';

import { Constants } from '@/constants';

interface Props {
  isVisible: boolean;
  close: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const AppModal = memo<Props>(({ isVisible, close, title, children }) => {
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      animationInTiming={400}
      animationOutTiming={400}
      onBackdropPress={close}
      backdropOpacity={0.6}>
      <View
        style={{ padding: 16, borderRadius: 16, backgroundColor: 'white', position: 'relative' }}>
        <Pressable onPress={close} style={{ position: 'absolute', top: 8, right: 8 }}>
          <AppIcon
            name="close-circle"
            width={20}
            height={20}
            color={Constants.colors.primitive.gray[400]}
          />
        </Pressable>
        {/* タイトル */}
        <Flex style={{ justifyContent: 'center', paddingTop: 8, marginBottom: 24 }}>{title}</Flex>
        {/* 中身 */}
        <View style={{ width: '100%' }}>{children}</View>
      </View>
    </Modal>
  );
});
