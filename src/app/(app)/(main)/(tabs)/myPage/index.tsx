import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AVATAR_SIZE, Constants, APP_NAME, BOTTOM_SHEET_STYLE } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { UserInfo } from '@/features/MyPage/components/UserInfo';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { usePatchMyProfile } from '@/features/User/apis/patchMyProfile';
import { openURL } from '@/functions/utils';
import { convertToBase64FromModule } from '@/utils/image';

const Avatar01 = require('assets/avatar/avatar01.png') as string;
const Avatar02 = require('assets/avatar/avatar02.png') as string;
const Avatar03 = require('assets/avatar/avatar03.png') as string;
const Avatar04 = require('assets/avatar/avatar04.png') as string;
const Avatar05 = require('assets/avatar/avatar05.png') as string;
const Avatar06 = require('assets/avatar/avatar06.png') as string;
const Avatar07 = require('assets/avatar/avatar07.png') as string;
const ImageList = [
  { key: 'no-avatar', image: '' },
  { key: 'avatar01', image: Avatar01 },
  { key: 'avatar02', image: Avatar02 },
  { key: 'avatar03', image: Avatar03 },
  { key: 'avatar04', image: Avatar04 },
  { key: 'avatar05', image: Avatar05 },
  { key: 'avatar06', image: Avatar06 },
  { key: 'avatar07', image: Avatar07 },
] as const;

const { width } = Dimensions.get('window');

export default function MyPagePage() {
  const { data } = useFetchMyProfile({});
  const [image, setImage] = useState(data?.imageUrl || '');
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const mutation = usePatchMyProfile({});
  const [tmpImage, setTmpImage] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const snapPoints = useMemo(() => ['28%'], []);
  const userInfoData = useMemo(() => {
    return data ? { ...data, imageUrl: image } : undefined;
  }, [data, image]);

  const setDefaultAvatar = useCallback(
    async (image: string, key: string) => {
      if (imageKey === key) {
        setImageKey(null);
        setTmpImage('');
        return;
      }
      const base64 = await convertToBase64FromModule(image);
      if (base64) {
        setImageKey(key);
        setTmpImage(base64);
      }
    },
    [imageKey]
  );

  const handleOpenSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.close();
    }
  };

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const base64 = await convertToBase64FromModule(imageUri);
      if (base64) {
        setTmpImage(base64);
      }
    }
  }, []);

  useEffect(() => {
    if (data?.imageUrl) {
      setImage(data.imageUrl);
    }
  }, [data?.imageUrl]);

  const updateImage = useCallback(async () => {
    if (data && tmpImage && data.imageUrl !== tmpImage) {
      setPending(true);
      mutation.mutate(
        {
          id: data.id || '',
          data: { ...data, imageUrl: tmpImage },
        },
        {
          onSuccess: () => {
            queryClient.setQueryData(['profile'], (data: any) => ({ ...data, imageUrl: tmpImage }));
            Toast.show({
              type: 'successToast',
              text1: 'プロフィール画像を変更しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
            setTmpImage('');
            setImageKey(null);
          },
          onSettled: () => {
            setPending(false);
            handleCloseSheet();
          },
        }
      );
    }
  }, [data, tmpImage, mutation, queryClient]);

  return (
    <Container bgColor={Constants.colors.primitive.pink[50]}>
      <View style={{ flex: 1, paddingVertical: 16 }}>
        <View style={{ padding: 16, borderRadius: 8, backgroundColor: 'white' }}>
          <UserInfo data={userInfoData} openSheet={handleOpenSheet} closeSheet={handleCloseSheet} />
        </View>
        {/* サポート */}
        <View style={{ marginTop: 24, width: '100%' }}>
          <Flex style={{ gap: 6, alignItems: 'center', marginBottom: 8 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Constants.colors.primitive.pink[300],
              }}
            />
            <Text style={{ fontSize: 12 }}>サポート</Text>
          </Flex>
          <View style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
            {/* お問い合わせ */}
            <Link href="/myPage/contact" style={{ height: 48, backgroundColor: 'white' }}>
              <Flex
                style={{
                  paddingLeft: 16,
                  paddingRight: 8,
                  paddingVertical: 16,
                  justifyContent: 'space-between',
                  width: '100%',
                  height: 52,
                  alignItems: 'center',
                }}>
                <Text>お問い合わせ</Text>
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
        {/* その他 */}
        <View style={{ marginTop: 24, width: '100%' }}>
          <Flex style={{ gap: 6, alignItems: 'center', marginBottom: 8 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Constants.colors.primitive.pink[300],
              }}
            />
            <Text style={{ fontSize: 12 }}>その他</Text>
          </Flex>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            {/* アカウント設定 */}
            <View style={{ width: '100%' }}>
              <Link href="/myPage/account" style={{ height: 48, backgroundColor: 'white' }}>
                <Flex
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingVertical: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 52,
                    alignItems: 'center',
                  }}>
                  <Text>アカウント設定</Text>
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
            {/* プライバシーポリシー */}
            <Pressable
              onPress={() =>
                openURL('https://ryotanny.notion.site/bf33d3830eb8492cb28872569e875179')
              }>
              <View style={{ width: '100%', height: 48, backgroundColor: 'white' }}>
                <Flex
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingVertical: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text>プライバシーポリシー</Text>
                  <AppIcon
                    name="new-window-arrow"
                    width={16}
                    height={16}
                    color={Constants.colors.primitive.gray[300]}
                  />
                </Flex>
              </View>
            </Pressable>
            {/* 利用規約 */}
            <Pressable
              onPress={() =>
                openURL('https://ryotanny.notion.site/684b04dcdc7a4212a2c6334a5743b9c8')
              }>
              <View style={{ width: '100%', height: 48, backgroundColor: 'white' }}>
                <Flex
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingVertical: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text>利用規約</Text>
                  <AppIcon
                    name="new-window-arrow"
                    width={16}
                    height={16}
                    color={Constants.colors.primitive.gray[300]}
                  />
                </Flex>
              </View>
            </Pressable>
            {/* アプリを共有 */}
            {/* // TODO: appstoreのリンク取得後コメントアウト外す */}
            {/* <Pressable
              onPress={() =>
                Share.share({
                  message:
                    "https://apps.apple.com/jp/app/%E7%9E%91%E6%83%B3time/id6475310806",
                })
              }
            >
            <View style={{ width: '100%', height: 48, backgroundColor: 'white' }}>
              <Flex
                style={{
                  paddingLeft: 16,
                  paddingRight: 8,
                  paddingVertical: 16,
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text>アプリを共有</Text>
                <AppIcon
                  name="new-window-arrow"
                  width={16}
                  height={16}
                  color={Constants.colors.primitive.gray[300]}
                />
              </Flex>
            </View>
            </Pressable> */}
            {/* Sharelyについて */}
            <View style={{ width: '100%' }}>
              <Link href="/myPage/about" style={{ height: 48, backgroundColor: 'white' }}>
                <Flex
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingVertical: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 52,
                    alignItems: 'center',
                  }}>
                  <Text>{APP_NAME}について</Text>
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
            {/* ライセンス */}
            <View style={{ width: '100%' }}>
              <Link href="/myPage/license" style={{ height: 48, backgroundColor: 'white' }}>
                <Flex
                  style={{
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingVertical: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 52,
                    alignItems: 'center',
                  }}>
                  <Text>ライセンス</Text>
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
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={BOTTOM_SHEET_STYLE}>
        <View style={{ marginTop: 8 }}>
          <NotoText style={{ paddingHorizontal: 16 }}>画像を選択してください</NotoText>
          <FlatList
            horizontal
            data={ImageList}
            renderItem={({ item, index }) => (
              <View
                style={[
                  {
                    paddingLeft: index === 0 ? 16 : 12,
                    paddingRight: index === ImageList.length - 1 ? 12 : 0,
                  },
                ]}>
                {index === 0 ? (
                  <Pressable onPress={pickImage}>
                    <View style={styles.noOutline}>
                      <View style={[styles.noImagePickerButton]}>
                        {tmpImage && !imageKey && (
                          <>
                            <Image
                              contentFit="cover"
                              source={{ uri: tmpImage }}
                              style={[
                                styles.avatarSize,
                                {
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                },
                              ]}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: '#00000020',
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE,
                              }}
                            />
                          </>
                        )}
                        {(!tmpImage || imageKey) && <AppIcon name="camera" />}
                      </View>
                    </View>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      Haptics.selectionAsync();
                      setDefaultAvatar(item.image, item.key);
                    }}>
                    <View style={item.key === imageKey ? styles.outline : styles.noOutline}>
                      <View style={styles.imagePickerWrapper}>
                        <Image contentFit="cover" source={item.image} style={styles.avatarSize} />
                      </View>
                    </View>
                  </Pressable>
                )}
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            style={{ width, paddingVertical: 12, marginBottom: 16 }}
          />
          <View style={{ paddingHorizontal: 16 }}>
            <Button
              onPress={updateImage}
              disabled={!tmpImage}
              loading={pending}
              textStyle={{ fontSize: 14 }}>
              画像を変更
            </Button>
          </View>
        </View>
      </BottomSheetModal>
    </Container>
  );
}

const styles = StyleSheet.create({
  imagePickerWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Constants.radius['3xl'],
    overflow: 'hidden',
  },
  outline: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'rgba(63, 153, 225, 0.60)',
    borderRadius: Constants.radius['3xl'],
  },
  noOutline: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: Constants.radius['3xl'],
  },
  avatarSize: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  noImagePickerButton: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Constants.radius['3xl'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.colors.primitive.gray[100],
    position: 'relative',
    overflow: 'hidden',
  },
});
