import { Image } from 'expo-image';
import { memo } from 'react';
import { View } from 'react-native';

import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { Recipe } from '@/features/Recipe/types';

interface Props {
  data: Omit<Recipe, 'id'> | Recipe;
}

export const RecipeItem = memo<Props>(({ data }) => {
  return (
    <Flex style={{ gap: 8 }}>
      <Image
        source={data.thumbnailUrl}
        style={{ width: 114, height: 64, borderRadius: Constants.radius.base }}
      />
      <View style={{ flex: 1 }}>
        <Text fw="bold" style={{ fontSize: 14 }}>
          {data.title}
        </Text>
        <Flex style={{ alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Image source={data.faviconUrl} style={{ width: 12, height: 12 }} />
          <Text style={{ fontSize: 10, color: Constants.colors.primitive.gray['600'] }}>
            {data.appName}
          </Text>
        </Flex>
      </View>
    </Flex>
  );
});
