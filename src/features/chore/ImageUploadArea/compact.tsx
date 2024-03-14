import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Flex } from '@/features/chore/Flex';
import { NotoText } from '@/features/chore/Text';
import { AppIcon } from '@/features/chore/icons';
import { Constants } from '@/constants';

interface Props {
  image: string;
  setImage: (image: string) => void;
  deleteImage: () => void;
}

const AREA_WIDTH = 72;
const AREA_HEIGHT = 72;

export const CompactImageUploadArea = memo<Props>(({ image, setImage, deleteImage }) => {
  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, [setImage]);
  return (
    <Pressable onPress={pickImage}>
      {image ? (
        <Flex style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image contentFit="cover" source={{ uri: image }} style={styles.imageView} />
            <Pressable onPress={deleteImage} style={styles.closeButtonWrapper}>
              <AppIcon name="filled-close" width={20} height={20} />
            </Pressable>
          </View>
        </Flex>
      ) : (
        <Flex style={[styles.container, styles.noImageContainer]}>
          <AppIcon name="camera" width={24} height={24} />
          <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray[600] }}>
            画像を追加
          </NotoText>
        </Flex>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Constants.radius.lg,
    flexDirection: 'column',
    gap: 4,
    overflow: 'hidden',
    width: AREA_WIDTH,
    height: AREA_HEIGHT,
  },
  noImageContainer: {
    backgroundColor: Constants.colors.primitive.gray[100],
  },
  imageView: {
    width: AREA_WIDTH,
    height: AREA_HEIGHT,
  },
  imageWrapper: { position: 'relative' },
  closeButtonWrapper: { position: 'absolute', right: 4, top: 4 },
});
