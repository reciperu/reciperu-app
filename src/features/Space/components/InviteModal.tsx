import Clipboard from '@react-native-community/clipboard';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostSpaceInvitation } from '../apis/postSpaceInvitation';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppModal } from '@/cores/components/Modal';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const InviteModal = memo<Props>(({ isVisible, onClose }) => {
  const [code, setCode] = useState('');
  //   const [expiredAt, setExpiredAt] = useState('2024-07-02 19:01');
  const mutation = usePostSpaceInvitation({});
  const copyToClipboard = useCallback(() => {
    try {
      Clipboard.setString('code');
      Toast.show({
        type: 'successToast',
        text1: 'コピーしました',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    } catch (err) {
      Toast.show({
        type: 'errorToast',
        text1: 'コピーに失敗しました',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    }
  }, []);
  const fetchInvitationCode = useCallback(
    (showToast?: boolean) => {
      mutation.mutate(undefined, {
        onSuccess: (res) => {
          setCode(res.token);
          if (showToast && res.token !== code) {
            Toast.show({
              type: 'successToast',
              text1: '招待コードを更新しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
          }
        },
        onError: () => {
          Toast.show({
            type: 'errorToast',
            text1: '招待コードの取得に失敗しました',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
          });
        },
      });
    },
    [mutation, code]
  );
  useEffect(() => {
    if (!code.length && isVisible) {
      fetchInvitationCode(false);
    }
  }, []);
  return (
    <>
      <AppModal
        isVisible={isVisible}
        close={onClose}
        title={
          <NotoText fw="bold" style={{ textAlign: 'center' }}>
            招待コードを招待したいパートナーに{'\n'}共有してください
          </NotoText>
        }>
        <View
          style={{
            position: 'relative',
            backgroundColor: Constants.colors.primitive.gray[50],
            padding: 12,
            paddingLeft: 16,
            height: 48,
            borderRadius: Constants.radius.xl,
          }}>
          <NotoText fw="black" style={{ fontSize: 16 }}>
            {code}
          </NotoText>
          {code.length > 0 && (
            <View
              style={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}>
              <Pressable onPress={copyToClipboard}>
                <Flex
                  style={{
                    width: 32,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AppIcon
                    name="copy"
                    width={20}
                    height={20}
                    color={Constants.colors.primitive.gray[400]}
                  />
                </Flex>
              </Pressable>
            </View>
          )}
        </View>
        {/* <NotoText
          style={{
            marginVertical: 16,
            textAlign: 'center',
            color: Constants.colors.primitive.gray[500],
          }}>
          有効期限：{expiredAt}まで
        </NotoText> */}
        <View style={{ marginVertical: 24 }}>
          <Pressable onPress={() => fetchInvitationCode(true)}>
            <Flex
              style={{
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                height: 32,
              }}>
              {mutation.isPending ? (
                <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
              ) : (
                <AppIcon
                  name="reload"
                  color={Constants.colors.primitive.gray[400]}
                  width={18}
                  height={18}
                />
              )}
              <NotoText
                style={{
                  color: Constants.colors.primitive.gray[500],
                  textDecorationLine: 'underline',
                  fontSize: 12,
                }}>
                更新する
              </NotoText>
            </Flex>
          </Pressable>
        </View>
      </AppModal>
    </>
  );
});
