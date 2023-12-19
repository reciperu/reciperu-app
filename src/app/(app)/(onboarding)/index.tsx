import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View, Pressable, FlatList } from 'react-native';

import { Button } from '@/components/ui/Button';
import { InputLabel } from '@/components/ui/InputLabel';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/TextInput';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';
import { usePatchMyProfile } from '@/features/Users/apis/patchMyProfile';
import { convertToBase64FromModule } from '@/utils/image';

const AVATAR_SIZE = 40;

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

export default function OnboardingTopPage() {
  const { width } = Dimensions.get('window');
  const [image, setImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const disabled = useMemo(() => {
    return !username || !image;
  }, [username, image]);
  const { data } = useFetchMyProfile();
  const { updateProfile } = usePatchMyProfile();
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
        await updateProfile(data.id, {
          name: username,
          imageUrl: image,
          activeStatus: data?.activeStatus,
        });
        router.push('/(onboarding)/createSpace');
      } catch (e) {
        console.error(e);
      }
    }
  }, [username, image, data?.id, data?.activeStatus, updateProfile]);
  useEffect(() => {
    if (data) {
      if (!image) setImage(data.imageUrl);
      if (!username) setImage(data.name);
    }
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
        <Text style={styles.stepper}>1/4</Text>
        <Text fw="bold" style={styles.pageTitle}>
          あなたの情報を教えてください
        </Text>
      </View>
      <View style={styles.contentWrapper}>
        {/* プロフィール画像 */}
        <View style={styles.imageInputWrapper}>
          <InputLabel>プロフィール画像</InputLabel>
          <Pressable onPress={pickImage} style={styles.avatarButtonWrapper}>
            <View style={styles.imagePickerWrapper}>
              {image ? (
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
              <Pressable onPress={() => setDefaultAvatar(item.image, item.key)}>
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
            onChange={(text) => setUsername(text)}
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
