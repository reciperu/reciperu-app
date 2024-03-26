import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { useFetchMetaData } from '@/features/Recipe/apis/getMetaData';
import { Container } from '@/cores/components/Container';
import { NotoText } from '@/cores/components/Text';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { SpaceRecipe } from '@/features/Recipe/types';
import { Spacer } from '@/cores/components/Spacer';
import { Button } from '@/cores/components/Button';
import { Flex } from '@/cores/components/Flex';
import { noop } from '@/functions/utils';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppIcon } from '@/cores/components/icons';
import { AppModal } from '@/cores/components/Modal';
import { useModal } from '@/cores/components/Modal/useModal';
import { InputLabel } from '@/cores/components/InputLabel';
import { TextInput } from '@/cores/components/TextInput';

export default function Modal() {
  const isPresented = router.canGoBack();
  const { isVisible, openModal, closeModal } = useModal();
  const { push } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const params = useLocalSearchParams();
  const data = useMemo(() => {
    if (params) {
      return {
        title: params.title,
        thumbnailUrl: params.thumbnailUrl,
        imageUrls: params.imageUrls,
        memo: params.memo,
        recipeUrl: params.recipeUrl,
        faviconUrl: params.faviconUrl,
        appName: params.appName,
        spaceId: params.spaceId,
        userId: params.userId,
        isFavorite: Boolean(params.isFavorite),
      } as SpaceRecipe;
    }
    return null;
  }, [params]);
  const toggleMode = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [isEditing]);

  const confirmDelete = useCallback(() => {
    Alert.alert('レシピを削除しますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          console.log('削除');
        },
      },
    ]);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof params.title === 'string' ? params.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => (
            <TouchableOpacity onPress={toggleMode}>
              <NotoText fw="bold" style={styles.headerUpdateButton}>
                {isEditing ? '保存' : '編集'}
              </NotoText>
            </TouchableOpacity>
          ),
        }}
      />
      <Container>
        {isEditing ? (
          <></>
        ) : data ? (
          <View style={{ flex: 1 }}>
            <RecipeDetail data={data} />
            <Spacer />
            <Button
              onPress={() =>
                push({
                  pathname: `recipe/${params.slug}/webview`,
                  params: { title: params.title, recipeUrl: params.recipeUrl },
                })
              }>
              レシピを見る
            </Button>
            <View style={{ marginTop: 10 }}>
              <Button variant="primary" scheme="text" onPress={openModal}>
                献立にする
              </Button>
            </View>
            <Button variant="primary" scheme="text" onPress={confirmDelete}>
              レシピを削除
            </Button>
          </View>
        ) : null}
      </Container>
      <AppModal
        isVisible={isVisible}
        close={closeModal}
        title={
          <NotoText fw="bold" style={{ fontSize: 14 }}>
            献立に設定
          </NotoText>
        }>
        <View>
          <InputLabel required>食べる日</InputLabel>
          <TextInput
            value={date}
            onChange={(text) => setDate(text)}
            // errorMessage={emailFormErrorMessage}
          />
          <NotoText
            style={{
              fontSize: 12,
              color: Constants.colors.primitive.gray[600],
              marginTop: 4,
              marginBottom: 40,
            }}>
            後で設定・変更することができます
          </NotoText>
          <Button onPress={closeModal}>決定</Button>
        </View>
      </AppModal>
    </>
  );
}

const styles = StyleSheet.create({
  headerUpdateButton: { color: Constants.colors.primitive.blue[400], fontSize: 16 },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
