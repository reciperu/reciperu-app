import * as AppleAuthentication from 'expo-apple-authentication';
import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

export default function SignInPage() {
  const authContext = useAuthContext();
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
パートナーとシェアしましょう！`}
          </NotoText>
          <Spacer />
          <Flex
            style={{ alignItems: 'center', gap: 4, justifyContent: 'center', marginBottom: 24 }}>
            <NotoText
              style={{
                fontSize: 12,
                color: Constants.colors.primitive.gray[600],
              }}>
              このサービスを利用することで、
              <Link href="terms">
                <NotoText
                  style={{
                    color: Constants.colors.primitive.blue[400],
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    textDecorationColor: Constants.colors.primitive.blue[400],
                  }}>
                  {' '}
                  利用規約{' '}
                </NotoText>
              </Link>
              および
              <Link href="privacyPolicy">
                <NotoText
                  style={{
                    color: Constants.colors.primitive.blue[400],
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    textDecorationColor: Constants.colors.primitive.blue[400],
                  }}>
                  {' '}
                  プライパシーポリシー{' '}
                </NotoText>
              </Link>
              に同意したものとみなされます
            </NotoText>
          </Flex>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={40}
            style={{ height: 48, opacity: authContext.appleAuthPending ? 0.4 : 1 }}
            onPress={() => authContext.signInWithApple()}
          />
          <View style={{ marginTop: 16 }}>
            <Button
              scheme="text"
              loading={authContext.googleAuthPending}
              leftIcon={<AppIcon name="google-logo" width={16} height={16} />}
              textStyle={{ color: 'black', fontSize: 16 }}
              onPress={() => authContext.signInWithGoogle()}>
              Googleでサインイン
            </Button>
          </View>
        </View>
      </Container>
    </>
  );
}
