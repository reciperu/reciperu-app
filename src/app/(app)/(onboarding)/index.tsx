import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View, Pressable, FlatList } from 'react-native';

import { AVATAR_SIZE, Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Button } from '@/cores/components/Button';
import { InputLabel } from '@/cores/components/InputLabel';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { AppIcon } from '@/cores/components/icons';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { usePatchMyProfile } from '@/features/User/apis/patchMyProfile';
import { convertToBase64FromModule } from '@/utils/image';

const Avatar01 = require('assets/avatar/avatar01.png') as string;
const Avatar02 = require('assets/avatar/avatar02.png') as string;
const Avatar03 = require('assets/avatar/avatar03.png') as string;
const Avatar04 = require('assets/avatar/avatar04.png') as string;
const Avatar05 = require('assets/avatar/avatar05.png') as string;
const Avatar06 = require('assets/avatar/avatar06.png') as string;
const Avatar07 = require('assets/avatar/avatar07.png') as string;
const ImageList = [
  { key: 'avatar01', image: Avatar01 },
  { key: 'avatar02', image: Avatar02 },
  { key: 'avatar03', image: Avatar03 },
  { key: 'avatar04', image: Avatar04 },
  { key: 'avatar05', image: Avatar05 },
  { key: 'avatar06', image: Avatar06 },
  { key: 'avatar07', image: Avatar07 },
] as const;

const { width } = Dimensions.get('window');

export default function OnboardingTopPage() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const disabled = useMemo(() => {
    return !username || !image;
  }, [username, image]);
  const { data } = useFetchMyProfile({});
  const mutation = usePatchMyProfile({});

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageKey(null);
      setImage(result.assets[0].uri);
    }
  }, []);

  const setDefaultAvatar = useCallback(
    async (image: string, key: string) => {
      if (imageKey === key) {
        setImageKey(null);
        setImage(null);
        return;
      }
      const base64 = await convertToBase64FromModule(image);
      if (base64) {
        setImageKey(key);
        setImage(base64);
      }
    },
    [imageKey]
  );
  const handlePress = useCallback(async () => {
    if (username && image && data?.id) {
      try {
        mutation.mutate(
          {
            id: data.id,
            data: {
              name: username,
              imageUrl: image,
              activeStatus: data?.activeStatus,
            },
          },
          {
            onSuccess: () => {
              queryClient.setQueryData(['profile'], (data: any) => {
                if (data) {
                  return {
                    ...data,
                    name: username,
                    imageUrl: image,
                    activeStatus: data?.activeStatus,
                  };
                }
                return {
                  name: username,
                  imageUrl: image,
                  activeStatus: data?.activeStatus,
                };
              });
              router.push('/(onboarding)/createSpace');
            },
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [username, image, data, mutation, queryClient]);
  useEffect(() => {
    if (data) {
      if (!image) setImage(data.imageUrl);
      if (!username) setUsername(data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <View style={styles.titleWrapper}>
        <NotoText style={styles.stepper}>1/4</NotoText>
        <NotoText fw="bold" style={styles.pageTitle}>
          あなたの情報を教えてください
        </NotoText>
      </View>
      <View style={styles.contentWrapper}>
        {/* プロフィール画像 */}
        <View style={styles.imageInputWrapper}>
          <InputLabel>プロフィール画像</InputLabel>
          <Pressable onPress={pickImage} style={styles.avatarButtonWrapper}>
            <View style={styles.imagePickerWrapper}>
              {image?.length ? (
                <Image contentFit="cover" source={{ uri: image }} style={styles.avatarSize} />
              ) : (
                <View style={styles.noImagePickerButton}>
                  <AppIcon name="camera" />
                </View>
              )}
            </View>
          </Pressable>
        </View>
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
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          style={{ width, paddingVertical: 28 }}
        />
        {/* お名前 */}
        <View style={styles.imageInputWrapper}>
          <InputLabel>お名前</InputLabel>
          <TextInput
            value={username}
            onChange={(text) => {
              setUsername(text);
            }}
            maxLength={Validation.USER_NAME.MAX_LENGTH.VALUE}
          />
        </View>
      </View>
      <Spacer />
      <View
        style={[
          styles.bottomArea,
          {
            width,
          },
        ]}>
        <Button disabled={disabled} onPress={handlePress}>
          次に進む
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  titleWrapper: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  stepper: {
    fontSize: 14,
    color: Constants.colors.primitive['black alpha'][600],
  },
  pageTitle: {
    fontSize: 18,
    marginVertical: 2,
  },
  contentWrapper: { marginTop: 36 },
  imageInputWrapper: {
    paddingHorizontal: 16,
  },
  avatarButtonWrapper: { width: AVATAR_SIZE },
  bottomArea: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  imagePickerWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: Constants.radius['3xl'],
    overflow: 'hidden',
  },
  noImagePickerButton: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.colors.primitive.gray[100],
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
});
