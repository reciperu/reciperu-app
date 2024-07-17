import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppIcon } from '@/cores/components/icons';
import { usePatchMyProfile } from '@/features/User/apis/patchMyProfile';
import { SpaceUser } from '@/features/User/types';

interface Props {
  data?: SpaceUser;
  openSheet: () => void;
  closeSheet: () => void;
}

export const UserInfo = memo<Props>(({ data, openSheet }) => {
  const queryClient = useQueryClient();
  const mutation = usePatchMyProfile({});
  const [name, setName] = useState(data?.name || '');

  const handleOnBlur = useCallback(async () => {
    if (data && data.name !== name) {
      mutation.mutate(
        { id: data?.id, data: { ...data, name } },
        {
          onSuccess: () => {
            queryClient.setQueryData(['profile'], (data: any) => ({ ...data, name }));
            Toast.show({
              type: 'successToast',
              text1: 'ユーザー名を変更しました',
              visibilityTime: 3000,
              autoHide: true,
              position: 'bottom',
            });
          },
        }
      );
    }
  }, [data, name, mutation, queryClient]);

  return (
    <>
      <Flex style={{ alignItems: 'center', gap: 4 }}>
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
        <Flex style={{ gap: 4, alignItems: 'center', position: 'relative' }}>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              fontWeight: 'bold',
              paddingVertical: 8,
              paddingLeft: 8,
              paddingRight: 24,
            }}
            onBlur={handleOnBlur}
          />
          <View style={{ position: 'absolute', right: 4, zIndex: -1 }}>
            <AppIcon
              name="pencil"
              width={16}
              height={16}
              color={Constants.colors.primitive.gray[400]}
            />
          </View>
        </Flex>
      </Flex>
    </>
  );
});
