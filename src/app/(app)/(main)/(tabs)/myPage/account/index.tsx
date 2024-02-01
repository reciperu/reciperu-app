import { Container } from '@/components/ui/Container';
import { Flex } from '@/components/ui/Flex';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { Link, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

export default function AccountPage() {
  const authContext = useAuthContext();
  const router = useRouter();
  const handleSignOut = useCallback(() => {
    Alert.alert('ログアウトしますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: () => {
          authContext.signOut();
          router.push('/(auth)/sign-in');
        },
      },
    ]);
  }, [authContext]);
  return (
    <Container bgColor={Constants.colors.primitive.gray[100]}>
      <View style={{ flex: 1, paddingVertical: 16 }}>
        <View style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
          {/* // TODO */}
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
              sample@sample.com
            </Text>
          </Flex>
          {/* // TODO */}
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
            <Text style={{ fontSize: 12, color: Constants.colors.primitive.gray[500] }}>LINE</Text>
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
