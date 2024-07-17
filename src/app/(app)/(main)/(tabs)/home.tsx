import { useActionSheet } from '@expo/react-native-action-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Dimensions, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { ArrowBack } from '@/cores/components/icons/components/ArrowBack';
// import { PlannedMenuSection } from '@/features/Home/components/PlannedMenuSection';
import { UserEatingListSection } from '@/features/Home/components/UserEatingListSection';
import { UserIconList } from '@/features/Home/components/UserIconList';
import { useRequestedRecipeByUser } from '@/features/Home/hooks/useRequestedRecipeByUser';
import { useFetchSpace } from '@/features/Space/apis/getSpace';
import { EditSpaceNameModal } from '@/features/Space/components/EditSpaceNameModal';
import { useUser } from '@/features/User/hooks/useUser';

const { width, height } = Dimensions.get('window');

export default function HomePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [isEditSpaceNameModalVisible, setIsEditSpaceNameModalVisible] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const { myInfo, partnerInfo } = useUser();
  const { data: space } = useFetchSpace({
    id: myInfo?.spaceId,
  });
  const { myRequestedRecipes, partnerRequestedRecipes } = useRequestedRecipeByUser();
  const queryClient = useQueryClient();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (!refreshing) {
      await queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['space', myInfo?.spaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['requested-recipes'],
      });
    }
    // await queryClient.invalidateQueries({
    //   queryKey: ['menus'],
    // });
    setRefreshing(false);
  }, [queryClient, refreshing, myInfo]);
  const imageHeight = (width / 390) * 103;
  const spaceName = useMemo(() => {
    return space?.name || '';
  }, [space]);
  const handlePressTitle = useCallback(() => {
    const isOwner = myInfo?.spaceRole === 'OWNER';
    const hasMultipleUsers = space?.users && space.users.length > 1;
    let options: string[] = [];
    if (isOwner) {
      if (hasMultipleUsers) {
        // options = ['スペース名の変更', 'パートナーをスペースから削除', 'キャンセル'];
        options = ['スペース名の変更', 'キャンセル'];
      } else {
        options = ['スペース名の変更', 'キャンセル'];
      }
    } else {
      if (hasMultipleUsers) {
        // options = ['スペース名の変更', 'スペースから離脱', 'キャンセル'];
        options = ['スペース名の変更', 'キャンセル'];
      } else {
        options = ['スペース名の変更', 'キャンセル'];
      }
    }
    const destructiveButtonIndex = options.length === 3 ? 1 : undefined;
    const cancelButtonIndex = options.length === 3 ? 2 : 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: 'スペースに関する操作',
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            setIsEditSpaceNameModalVisible(true);
            break;

          case destructiveButtonIndex:
            // TODO: 離脱の処理を書く
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  }, [showActionSheetWithOptions, space, myInfo]);
  const renderHeaderTitle = useCallback(() => {
    return (
      <Pressable onPress={handlePressTitle}>
        <Flex style={{ alignItems: 'center', gap: 8, paddingLeft: 8 }}>
          <NotoText fw="bold" numberOfLines={1} style={{ fontSize: 16, flexShrink: 1 }}>
            {spaceName}
          </NotoText>
          <View style={{ transform: 'rotate(-90deg)', marginTop: 4 }}>
            <ArrowBack width={16} height={16} color={Constants.colors.primitive.blue[400]} />
          </View>
        </Flex>
      </Pressable>
    );
  }, [handlePressTitle, spaceName]);
  return (
    <>
      <Tabs.Screen
        options={{
          headerTitle: renderHeaderTitle,
        }}
      />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1, backgroundColor: Constants.colors.primitive.pink['50'] }}>
        {/* ユーザー情報 */}
        <View style={{ paddingBottom: 48, backgroundColor: 'white' }}>
          <LinearGradient
            colors={['#FFF5F7', '#FED7E2']}
            style={{ width: '100%', height: imageHeight }}>
            <Image
              source={require('assets/home-decoration.png')}
              style={{ width: '100%', height: imageHeight, marginTop: 8 }}
              contentFit="contain"
            />
          </LinearGradient>
          <View style={{ marginTop: -24 }}>
            <UserIconList myProfile={myInfo} partnerProfile={partnerInfo} />
          </View>
        </View>
        <Container needBottomPadding style={{ minHeight: height - 376, paddingTop: 24 }}>
          {/* 計画中の献立 */}
          {/* <View style={{ marginBottom: 72 }}>
            <PlannedMenuSection />
          </View> */}
          {/* // todo: パートナーの食べたい料理 */}
          {/* 自分の食べたい料理 */}
          <View>
            <UserEatingListSection
              avatar={myInfo?.imageUrl}
              name={myInfo?.name}
              isPartner={false}
              recipes={myRequestedRecipes}
            />
          </View>
          {/* パートナーの食べたい料理 */}
          {partnerInfo && (
            <View>
              <UserEatingListSection
                avatar={partnerInfo?.imageUrl}
                name={partnerInfo?.name}
                isPartner
                recipes={partnerRequestedRecipes}
              />
            </View>
          )}
        </Container>
      </ScrollView>
      <EditSpaceNameModal
        spaceName={spaceName}
        spaceId={space?.id}
        isVisible={isEditSpaceNameModalVisible}
        onClose={() => setIsEditSpaceNameModalVisible(false)}
      />
    </>
  );
}
