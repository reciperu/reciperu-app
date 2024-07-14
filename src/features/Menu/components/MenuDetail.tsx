import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { Dimensions, Pressable, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

import { useDeleteMenu } from '../apis/deleteMenu';
import { usePutMenu } from '../apis/putMenu';
import { MenuItem } from '../types';

import { Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { useRecipes } from '@/features/Recipe/hooks/useRecipes';
import { RequestedRecipesResponse, SpaceRecipe } from '@/features/Recipe/types';
import { useRecipeRequest } from '@/features/RecipePage/hooks/useRecipeRequest';
import { useUser } from '@/features/User/hooks/useUser';
import dayjs from '@/lib/dayjs';

interface Props {
  data: MenuItem;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const MenuDetail = memo<Props>(({ data, onClose }) => {
  const mutation = usePutMenu({});
  const deleteMutation = useDeleteMenu({});
  const { myInfo } = useUser();
  const queryClient = useQueryClient();
  const [recipeData, setRecipeData] = useState<SpaceRecipe>(data.recipe);
  const [date, setDate] = useState<Date | undefined>(
    data.scheduledAt ? new Date(data.scheduledAt) : undefined
  );
  const [open, setOpen] = useState(false);
  const { getFavorite, addRequester, removeRequester } = useRecipes();
  const recipeRequestService = useRecipeRequest();
  // メニューを削除する
  const deleteMenu = useCallback(() => {
    deleteMutation.mutate(
      {
        id: data.id,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'successToast',
            text1: '献立を削除しました',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
          });
          onClose();
          queryClient.invalidateQueries({
            queryKey: ['pending-menus'],
          });
          // queryClient.invalidateQueries({
          //   queryKey: ['menus'],
          // });
        },
        onError: () => {
          Toast.show({
            type: 'errorToast',
            text1: '献立の削除に失敗しました',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
          });
        },
      }
    );
  }, [data.id, deleteMutation, queryClient, onClose]);
  // 食べる日を更新する
  const updateSchedule = useCallback(
    async (updateDate: Date) => {
      if (!updateDate) return;
      mutation.mutate(
        {
          id: data.id,
          data: {
            recipeId: data.recipe.id,
            scheduledAt: dayjs(updateDate).format(),
          },
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'successToast',
              text1: '食べる日を更新しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
            queryClient.invalidateQueries({
              queryKey: ['pending-menus'],
            });
            // queryClient.invalidateQueries({
            //   queryKey: ['menus'],
            // });
          },
          onError: () => {
            Toast.show({
              type: 'errorToast',
              text1: '食べる日の更新に失敗しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
          },
        }
      );
    },
    [data, mutation, queryClient]
  );
  // 「食べたい」のステートを入れ替える
  const toggleRequest = useCallback(async () => {
    const handleSuccessAdd = () => {
      const newRequesters = addRequester(recipeData.requesters) || [];
      setRecipeData((prev) => ({ ...prev, requesters: newRequesters }));
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: [
                {
                  ...recipeData,
                  requesters: newRequesters,
                },
                ...data.data[userId],
              ],
            },
          };
        }
        return data;
      });
    };
    const handleSuccessRemove = () => {
      const newRequesters = removeRequester(recipeData.requesters) || [];
      setRecipeData((prev) => ({ ...prev, requesters: newRequesters }));
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: data.data[userId].filter((recipe) => recipe.id !== recipeData.id),
            },
          };
        }
        return data;
      });
    };
    recipeRequestService.toggle(recipeData, handleSuccessAdd, handleSuccessRemove);
  }, [recipeData, recipeRequestService, addRequester, removeRequester, queryClient, myInfo]);
  return (
    <>
      <View>
        <Image
          source={{ uri: recipeData.thumbnailUrl }}
          alt={recipeData.title}
          style={{
            width: width - 32,
            height: ((width - 32) / 16) * 9,
            borderRadius: Constants.radius.lg,
          }}
        />
        <Flex
          style={{
            marginTop: 4,
            justifyContent: 'space-between',
          }}>
          <NotoText
            fw="bold"
            style={{
              fontSize: 16,
              paddingTop: 4,
              flex: 1,
              color: Constants.colors.primitive['gray']['600'],
            }}>
            {recipeData.title}
          </NotoText>
          <View>
            <TouchableOpacity onPress={toggleRequest}>
              <View
                style={{
                  padding: 8,
                  backgroundColor: 'white',
                  borderRadius: 24,
                }}>
                <AppIcon
                  name="bookmark"
                  width={16}
                  height={16}
                  color={
                    getFavorite(recipeData.requesters)
                      ? Constants.colors.primitive.pink[400]
                      : Constants.colors.primitive.gray[300]
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </Flex>
        <View
          style={{
            marginTop: 8,
            width: '100%',
          }}>
          {/* 登録者 */}
          {recipeData.user && (
            <Flex
              style={{
                gap: 8,
                height: 48,
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: Constants.colors.primitive.gray[200],
              }}>
              <NotoText style={{ fontSize: 12, width: 48 }}>登録者</NotoText>
              <Flex style={{ alignItems: 'center', gap: 4 }}>
                <Image
                  source={{ uri: recipeData.user.imageUrl }}
                  style={{ width: 20, height: 20, borderRadius: 10 }}
                />
                <NotoText style={{ fontSize: 12 }}>{recipeData.user.name}</NotoText>
              </Flex>
            </Flex>
          )}
          {/* レシピ（あれば） */}
          {recipeData.recipeUrl.length > 0 && (
            <Flex
              style={{
                gap: 8,
                height: 48,
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: Constants.colors.primitive.gray[200],
              }}>
              <NotoText style={{ fontSize: 12, width: 48 }}>レシピ</NotoText>
              <Flex style={{ alignItems: 'center', gap: 4 }}>
                <Image
                  source={{ uri: recipeData.faviconUrl }}
                  style={{ width: 20, height: 20, borderRadius: 10 }}
                />
                <NotoText style={{ fontSize: 12 }}>{recipeData.appName}</NotoText>
              </Flex>
              <Spacer />
            </Flex>
          )}
          {/* 食べる日 */}
          {date && (
            <Flex
              style={{
                gap: 8,
                height: 48,
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: Constants.colors.primitive.gray[200],
              }}>
              <NotoText style={{ fontSize: 12, width: 48 }}>食べる日</NotoText>
              <NotoText style={{ fontSize: 12 }}>{dayjs(date).format('YYYY/M/D')}</NotoText>
              <Spacer />
              <Pressable onPress={() => setOpen(true)}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: Constants.colors.primitive.pink[50],
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AppIcon
                    name="pencil"
                    width={12}
                    height={12}
                    color={Constants.colors.primitive.pink[400]}
                  />
                </View>
              </Pressable>
            </Flex>
          )}
          {/* {data.imageUrls?.length && (
              <View style={{ paddingVertical: 12 }}>
                {data.imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    source={{ uri: url }}
                    alt={data.title}
                    style={{
                      width: width - 32,
                      height: ((width - 32) / 16) * 9,
                      borderRadius: Constants.radius.lg,
                      marginVertical: 8,
                    }}
                  />
                ))}
              </View>
            )} */}
          {!!data.recipe.memo?.length && (
            <View style={{ paddingVertical: 12 }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: Constants.colors.primitive.gray[50],
                  borderRadius: Constants.radius.md,
                }}>
                <NotoText>{data.recipe.memo}</NotoText>
              </View>
            </View>
          )}
        </View>
      </View>
      <Spacer />
      <Button onPress={deleteMenu} loading={deleteMutation.isPending} disabled={mutation.isPending}>
        献立から削除
      </Button>
      <View style={{ marginTop: 8 }}>
        <RecipeWebviewLink
          id={data.recipe.id}
          recipeUrl={data.recipe.recipeUrl}
          title={data.recipe.title}>
          <Button variant="primary" scheme="text">
            レシピを見る
          </Button>
        </RecipeWebviewLink>
      </View>
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        minimumDate={new Date()}
        title="食べる日を選択してください"
        confirmText="決定"
        cancelText="キャンセル"
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          updateSchedule(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
});
