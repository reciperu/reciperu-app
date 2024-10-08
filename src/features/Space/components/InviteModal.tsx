import Clipboard from '@react-native-community/clipboard';
import * as Haptics from 'expo-haptics';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { usePostSpaceInvitation } from '../apis/postSpaceInvitation';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppModal } from '@/cores/components/Modal';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import dayjs from '@/lib/dayjs';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  renderPrimaryButton?: () => React.ReactNode;
}

export const InviteModal = memo<Props>(({ isVisible, onClose, renderPrimaryButton }) => {
  const [code, setCode] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const mutation = usePostSpaceInvitation({});
  const copyToClipboard = useCallback(() => {
    try {
      Clipboard.setString(code);
      Haptics.selectionAsync();
      Toast.show({
        type: 'successToast',
        text1: 'コピーしました',
        visibilityTime: 3000,
        autoHide: true,
        position: 'bottom',
      });
    } catch (err) {
      Toast.show({
        type: 'errorToast',
        text1: 'コピーに失敗しました',
        visibilityTime: 3000,
        autoHide: true,
        position: 'bottom',
      });
    }
  }, [code]);
  const fetchInvitationCode = useCallback(
    (showToast?: boolean) => {
      mutation.mutate(undefined, {
        onSuccess: (res) => {
          setCode(res.token);
          setExpiredAt(res.expiredAt);
          if (showToast && res.token !== code) {
            Toast.show({
              type: 'successToast',
              text1: '招待コードを更新しました',
              visibilityTime: 3000,
              autoHide: true,
              position: 'bottom',
            });
          }
        },
        onError: () => {
          Toast.show({
            type: 'errorToast',
            text1: '招待コードの取得に失敗しました',
            visibilityTime: 3000,
            autoHide: true,
            position: 'bottom',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, code]);
  useEffect(() => {
    if (!isVisible) {
      Toast.hide();
    }
  }, [isVisible]);
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
          {code.length === 0 && mutation.isPending ? (
            <View style={{ alignItems: 'flex-start', display: 'flex' }}>
              <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
            </View>
          ) : (
            <NotoText style={{ fontSize: 14 }}>{code}</NotoText>
          )}
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
        {!!expiredAt?.length && (
          <NotoText
            style={{
              marginTop: 16,
              textAlign: 'center',
              color: Constants.colors.primitive.gray[500],
            }}>
            有効期限：{dayjs(expiredAt).format('YYYY/M/D H:mm')}まで
          </NotoText>
        )}
        <View style={{ marginVertical: 24 }}>
          {dayjs(expiredAt).diff(dayjs(), 'second') < 0 && (
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
          )}
          {renderPrimaryButton?.()}
        </View>
      </AppModal>
    </>
  );
});
