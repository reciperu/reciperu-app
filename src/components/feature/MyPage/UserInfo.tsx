import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Flex } from '@/components/ui/Flex';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { usePatchMyProfile } from '@/features/User/apis/patchMyProfile';
import { SpaceUser } from '@/features/User/types';

interface Props {
  data?: SpaceUser;
  openSheet: () => void;
  closeSheet: () => void;
}

export const UserInfo = memo<Props>(({ data, openSheet, closeSheet }) => {
  const { updateProfile } = usePatchMyProfile();
  const [name, setName] = useState(data?.name || '');

  const handleOnBlur = useCallback(async () => {
    if (data && data.name !== name) {
      await updateProfile(data?.id, { ...data, name });
      Toast.show({
        type: 'successToast',
        text1: 'ユーザー名を変更しました',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    }
  }, [data, name, updateProfile]);

  return (
    <>
      <Flex style={{ alignItems: 'center', gap: 12 }}>
        <Pressable onPress={openSheet}>
          <View
            style={{
              width: 40,

              height: 40,
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
            }}>
            <Image source={{ uri: data?.imageUrl }} style={{ width: 40, height: 40 }} />
            <View
              style={{
                backgroundColor: Constants.colors.primitive['black alpha'][700],
                position: 'absolute',
                bottom: 0,
                padding: 2,
                width: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 6, fontWeight: 'bold' }}>編集</Text>
            </View>
          </View>
        </Pressable>
        <Flex style={{ gap: 4, alignItems: 'center' }}>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ fontWeight: 'bold' }}
            onBlur={handleOnBlur}
          />
          <AppIcon
            name="pencil"
            width={16}
            height={16}
            color={Constants.colors.primitive.gray[400]}
          />
        </Flex>
      </Flex>
    </>
  );
});
