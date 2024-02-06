import { Link, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import asyncStorage from '@/lib/asyncStorage';

export default function AccountPage() {
  const authContext = useAuthContext();
  const [loginMethod, setLoginMethod] = useState('');
  const router = useRouter();
  const email = useMemo(() => {
    if (authContext.user) {
      return authContext.user.email;
    }
    return '';
  }, [authContext]);
  const handleSignOut = useCallback(() => {
    Alert.alert('ログアウトしますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: async () => {
          await authContext.signOut();
          router.push('/(auth)/signIn');
        },
      },
    ]);
  }, [authContext]);
  useEffect(() => {
    const fetchLoginMethod = async () => {
      const loginMethod = await asyncStorage.getValueFor('last_login_method');
      if (loginMethod === 'google') {
        setLoginMethod('Google');
      } else if (loginMethod === 'apple') {
        setLoginMethod('Apple');
      }
    };
    fetchLoginMethod();
  }, []);
  return (
    <Container bgColor={Constants.colors.primitive.gray[100]}>
      <View style={{ flex: 1, paddingVertical: 16 }}>
        <View style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
          <Flex
            style={{
              padding: 16,
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              height: 48,
              backgroundColor: 'white',
            }}>
            <Text>メールアドレス</Text>
            <Text style={{ fontSize: 12, color: Constants.colors.primitive.gray[500] }}>
              {email}
            </Text>
          </Flex>
          <Flex
            style={{
              padding: 16,
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              height: 48,
              backgroundColor: 'white',
            }}>
            <Text>ログイン方法</Text>
            <Text style={{ fontSize: 12, color: Constants.colors.primitive.gray[500] }}>
              {loginMethod}
            </Text>
          </Flex>
        </View>
        <View style={{ width: '100%', borderRadius: 8, overflow: 'hidden', marginTop: 24 }}>
          <Pressable onPress={handleSignOut}>
            <Flex
              style={{
                padding: 16,
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                height: 48,
                backgroundColor: 'white',
              }}>
              <Text style={{ color: Constants.colors.primitive.red[500] }}>ログアウト</Text>
            </Flex>
          </Pressable>
          <Link href="/myPage/account/withdraw">
            <Flex
              style={{
                padding: 16,
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                height: 48,
                backgroundColor: 'white',
              }}>
              <Text>退会する</Text>
              <View
                style={{
                  transform: [{ rotate: '180deg' }],
                  width: 14,
                  height: 14,
                }}>
                <AppIcon
                  name="arrow-back"
                  width={14}
                  height={14}
                  color={Constants.colors.primitive.gray[300]}
                />
              </View>
            </Flex>
          </Link>
        </View>
      </View>
    </Container>
  );
}
