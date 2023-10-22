import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Spacer } from '@/components/ui/Spacer';
import { AppIcon } from '@/components/ui/icons';
import { useAuthContext } from '@/context/authProvider';
import { Text } from '@/components/ui/Text';

export default function SignInPage() {
  const authContext = useAuthContext();
  console.log(authContext);
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
        <View
          style={{
            flex: 1,
          }}>
          <Text fw='bold' style={{marginTop: 20, textAlign: 'center', fontSize: 16}}>あなただけの料理本を作りましょう</Text>
          <Spacer />
          <Button
            scheme="text"
            loading={authContext.loading}
            leftIcon={<AppIcon name="google-logo" width={20} height={20} />}
            onPress={() => authContext.googleSignIn()}>
            Googleでログイン
          </Button>
        </View>
      </Container>
    </>
  );
}
