import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

interface Props {
  image: string;
  setImage: (image: string) => void;
}

export const ImageUploadArea = memo<Props>(({ image, setImage }) => {
  const { width } = useWindowDimensions();
  const areaWidth = useMemo(() => width - 32, [width]);
  const areaHeight = useMemo(() => (areaWidth * 9) / 16, [areaWidth]);
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
        <Flex
          style={[
            {
              width: areaWidth,
              height: areaHeight,
            },
            styles.container,
          ]}>
          <View style={styles.imageWrapper}>
            <Image
              contentFit="cover"
              source={{ uri: image }}
              style={{
                width: areaWidth,
                height: areaHeight,
              }}
            />
            <Pressable onPress={() => setImage('')} style={styles.closeButtonWrapper}>
              <AppIcon name="filled-close" />
            </Pressable>
          </View>
        </Flex>
      ) : (
        <Flex
          style={[
            {
              width: areaWidth,
              height: areaHeight,
            },
            styles.container,
            styles.noImageContainer,
          ]}>
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
  },
  noImageContainer: {
    backgroundColor: Constants.colors.primitive.gray[100],
  },
  imageWrapper: { position: 'relative' },
  closeButtonWrapper: { position: 'absolute', right: 8, top: 8 },
});
