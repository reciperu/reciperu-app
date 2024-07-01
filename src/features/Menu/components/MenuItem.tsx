import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { MenuItem } from '../types';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';

interface Props {
  data: MenuItem;
}

export const CompactMenuItem = memo<Props>(({ data }) => {
  return (
    <Flex style={{ gap: 8, alignItems: 'center' }}>
      <Image
        source={data.recipe.thumbnailUrl}
        style={{ width: 48, height: 48, borderRadius: Constants.radius.lg }}
      />
      <View style={{ flex: 1 }}>
        <NotoText style={{ fontSize: 14 }} numberOfLines={2}>
          {data.recipe.title}
        </NotoText>
        <Flex style={{ alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Image source={data.recipe.faviconUrl} style={{ width: 12, height: 12 }} />
          <NotoText style={{ fontSize: 10, color: Constants.colors.primitive.gray['600'] }}>
            {data.recipe.appName}
          </NotoText>
        </Flex>
      </View>
      {data.recipe.recipeUrl.length > 0 && (
        <RecipeWebviewLink
          id={data.recipe.id}
          title={data.recipe.title}
          recipeUrl={data.recipe.recipeUrl}>
          <Pressable>
            <Flex
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                backgroundColor: Constants.colors.primitive.gray[50],
                borderRadius: Constants.radius['xl'],
              }}>
              <AppIcon
                name="window-open"
                width={14}
                height={14}
                color={Constants.colors.primitive.gray[500]}
              />
              <NotoText style={{ fontSize: 8, color: Constants.colors.primitive.gray[600] }}>
                レシピ
              </NotoText>
            </Flex>
          </Pressable>
        </RecipeWebviewLink>
      )}
    </Flex>
  );
});
