import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import { Spacer } from '@/components/ui/Spacer';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AppIcon } from '@/components/ui/icons';
import { useAuthContext } from '@/context/authProvider';

export default function SignInPage() {
  const authContext = useAuthContext();
  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: '',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,
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
          <Spacer />
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            // style={styles.button}
            onPress={authContext.signInWithApple}
          />
          <Button
            scheme="text"
            loading={authContext.googleAuthPending}
            leftIcon={<AppIcon name="google-logo" width={20} height={20} />}
            onPress={() => authContext.signInWithGoogle()}>
            Googleでログイン
          </Button>
        </View>
      </Container>
    </>
  );
}
