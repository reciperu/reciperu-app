import { Image } from 'expo-image';
import { memo } from 'react';
import { Dimensions, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { Recipe, SpaceRecipe } from '@/features/Recipe/types';

const windowWidth = Dimensions.get('window').width;

interface Props {
  data: Omit<Recipe, 'id'> | SpaceRecipe;
}

export const RecipeItem = memo<Props>(({ data }) => {
  return (
    <Flex style={{ gap: 8 }}>
      <Image
        source={data.thumbnailUrl}
        style={{ width: 114, height: 64, borderRadius: Constants.radius.base }}
      />
      <View style={{ flex: 1 }}>
        <NotoText
          style={{ fontSize: 14, color: Constants.colors.primitive.gray['700'] }}
          numberOfLines={2}>
          {data.title}
        </NotoText>
        <Flex style={{ alignItems: 'center', gap: 4, marginTop: 4 }}>
          <Image source={data.faviconUrl} style={{ width: 12, height: 12 }} />
          <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray['600'] }}>
            {data.appName}
          </NotoText>
        </Flex>
      </View>
    </Flex>
  );
});

export const RecipeCard = memo<Props>(({ data }) => {
  return (
    <View style={{ gap: 4, width: windowWidth * 0.6 }}>
      <View
        style={{
          borderRadius: Constants.radius.lg,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: Constants.colors.primitive.gray[100],
          overflow: 'hidden',
        }}>
        <Image
          source={data.thumbnailUrl}
          style={{
            width: windowWidth * 0.6,
            height: (windowWidth * 0.6 * 9) / 16,
          }}
        />
      </View>
      <View>
        <NotoText style={{ fontSize: 14 }} numberOfLines={2}>
          {data.title}
        </NotoText>
        <Flex style={{ alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Image source={data.faviconUrl} style={{ width: 12, height: 12 }} />
          <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray['600'] }}>
            {data.appName}
          </NotoText>
        </Flex>
      </View>
    </View>
  );
});
