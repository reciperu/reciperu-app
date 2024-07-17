import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { RecipeCard } from '@/features/Recipe/components/RecipeItem';
import { SpaceRecipe } from '@/features/Recipe/types';

const windowWidth = Dimensions.get('window').width;

interface Props {
  avatar?: string;
  name?: string;
  isPartner: boolean;
  recipes: SpaceRecipe[];
}

export const UserEatingListSection = memo<Props>(({ avatar, name, recipes, isPartner }) => {
  const router = useRouter();

  if (!avatar || !name) return null;
  return (
    <>
      <View>
        <Flex style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={avatar}
            style={{ width: 24, height: 24, borderRadius: 12 }}
            contentFit="contain"
          />
          <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
            あなたの食べたい料理
          </NotoText>
        </Flex>
        <View style={{ paddingVertical: 16 }}>
          {recipes.length === 0 ? (
            <>
              <Flex
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 16,
                }}>
                <FoodRandomImage />
                <>
                  {isPartner ? (
                    <NotoText
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        lineHeight: 24,
                        color: Constants.colors.primitive.gray[600],
                      }}>
                      食べたい料理は未登録です
                    </NotoText>
                  ) : (
                    <NotoText
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        lineHeight: 24,
                        color: Constants.colors.primitive.gray[600],
                      }}>
                      {`食べたい料理は未登録です
食べたい料理の`}
                      <View style={{ paddingHorizontal: 4, marginTop: -2 }}>
                        <AppIcon name="bookmark" width={20} height={20} />
                      </View>
                      をタップしましょう
                    </NotoText>
                  )}
                </>
              </Flex>
              <Flex style={{ justifyContent: 'center', marginTop: 24 }}>
                <LinkButton
                  onPress={() => router.push('(app)/(main)/(tabs)/recipe?route=AllRecipe')}>
                  レシピを探す
                </LinkButton>
              </Flex>
            </>
          ) : (
            <>
              <View
                style={{
                  width: windowWidth,
                  height: (windowWidth * 0.6 * 9) / 16 + 64,
                  position: 'relative',
                  marginTop: 16,
                }}>
                <FlatList
                  horizontal
                  data={recipes}
                  renderItem={({ item }) => (
                    <View style={{ paddingLeft: 16 }}>
                      <Pressable
                        onPress={() =>
                          router.push({
                            pathname: `recipe_detail/${item.id}`,
                            params: {
                              ...item,
                              imageUrls: JSON.stringify(item.imageUrls),
                              requesters: JSON.stringify(item.requesters),
                              user: JSON.stringify(item.user),
                            },
                          })
                        }>
                        <RecipeCard data={item} />
                      </Pressable>
                    </View>
                  )}
                  keyExtractor={(item) => String(item.id)}
                  contentContainerStyle={{ paddingBottom: 16, paddingRight: 16 }}
                  style={{ position: 'absolute', top: 0, left: -16 }}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
});
