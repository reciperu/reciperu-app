import * as AppleAuthentication from 'expo-apple-authentication';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { Button } from '@/cores/components/Button';
import { CheckIconButton } from '@/cores/components/CheckIconButton';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { AppModal } from '@/cores/components/Modal';
import { useModal } from '@/cores/components/Modal/useModal';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

export default function SignInPage() {
  const authContext = useAuthContext();
  const [checked, setChecked] = useState(false);
  const { isVisible, openModal, closeModal } = useModal();
  const checkAgreementCallback = useCallback(
    (callback: () => void) => {
      if (checked) {
        callback();
      } else {
        openModal();
      }
    },
    [checked, openModal]
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <Container>
        <View style={{ flex: 1 }}>
          <Flex style={{ justifyContent: 'center', paddingVertical: 40 }}>
            <Image
              source={require('assets/logo-vertical.svg')}
              style={{ width: 84, height: 126 }}
              alt="ロゴ"
            />
          </Flex>
          <NotoText style={{ textAlign: 'center' }}>
            {`作ったレシピを保存して
パートナーとシェアしましょう`}
          </NotoText>
          <Spacer />
          <Flex
            style={{ alignItems: 'center', gap: 4, justifyContent: 'center', marginBottom: 24 }}>
            <Pressable style={{ padding: 2 }} onPress={() => setChecked((prev) => !prev)}>
              <CheckIconButton checked={checked} size={16} />
            </Pressable>
            <NotoText
              style={{
                fontSize: 12,
                color: Constants.colors.primitive.gray[600],
              }}>
              <Link href="terms">
                <NotoText fw="bold"> 利用規約 </NotoText>
              </Link>
              と
              <Link href="privacyPolicy">
                <NotoText fw="bold"> プライパシーポリシー </NotoText>
              </Link>
              に同意します
            </NotoText>
          </Flex>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={40}
            style={{ height: 48 }}
            onPress={() => checkAgreementCallback(authContext.signInWithApple)}
          />
          <View style={{ marginTop: 16 }}>
            <Button
              scheme="text"
              loading={authContext.googleAuthPending}
              leftIcon={<AppIcon name="google-logo" width={16} height={16} />}
              textStyle={{ color: 'black' }}
              onPress={() => checkAgreementCallback(authContext.signInWithGoogle)}>
              Googleでサインイン
            </Button>
          </View>
        </View>
      </Container>
      <AppModal
        isVisible={isVisible}
        close={closeModal}
        title={
          <Flex style={{ alignItems: 'center', gap: 4 }}>
            <Image
              source={require('assets/hint.svg')}
              style={{ width: 24, height: 24 }}
              alt="アイコン"
            />
            <NotoText fw="bold" style={{ fontSize: 16 }}>
              ヒント
            </NotoText>
          </Flex>
        }>
        <View>
          <Flex
            style={{ alignItems: 'center', gap: 4, justifyContent: 'center', marginBottom: 24 }}>
            <NotoText
              style={{
                fontSize: 12,
                color: Constants.colors.primitive.gray[600],
              }}>
              <Link href="terms">
                <NotoText fw="bold"> 利用規約 </NotoText>
              </Link>
              と
              <Link href="privacyPolicy">
                <NotoText fw="bold"> プライパシーポリシー </NotoText>
              </Link>
              をお読みしていただく必要があります
            </NotoText>
          </Flex>
          <Flex style={{ flexDirection: 'column', gap: 8 }}>
            <Button
              onPress={() => {
                setChecked(true);
                closeModal();
              }}>
              確認しました
            </Button>
            <Button
              variant="others"
              textStyle={{ color: Constants.colors.primitive.gray[600] }}
              onPress={closeModal}>
              キャンセル
            </Button>
          </Flex>
        </View>
      </AppModal>
    </>
  );
}
