import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Flex } from '../Flex';
import { AppIcon } from '../icons';

import { Constants } from '@/constants';
import { toastConfig } from '@/lib/ToastConfig';

interface Props {
  isVisible: boolean;
  close: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const AppModal = memo<Props>(({ isVisible, close, title, children }) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      useNativeDriverForBackdrop
      animationInTiming={600}
      animationOutTiming={600}
      onBackdropPress={close}
      backdropOpacity={0.4}
      style={{
        justifyContent: 'flex-end',
        margin: 24,
        marginBottom: 24 + insets.bottom,
      }}>
      <View
        style={{ padding: 16, borderRadius: 16, backgroundColor: 'white', position: 'relative' }}>
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <Pressable onPress={close}>
            <View style={{ padding: 8 }}>
              <AppIcon
                name="close-circle"
                width={20}
                height={20}
                color={Constants.colors.primitive.gray[400]}
              />
            </View>
          </Pressable>
        </View>
        {/* タイトル */}
        <Flex style={{ justifyContent: 'center', paddingTop: 8, marginBottom: 24 }}>{title}</Flex>
        {/* 中身 */}
        <View style={{ width: '100%' }}>{children}</View>
      </View>
      <Toast config={toastConfig} />
    </Modal>
  );
});
