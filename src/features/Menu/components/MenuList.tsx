import { useRouter } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, RefreshControl, SectionList } from 'react-native';

import { EmptyView } from './EmptyView';
import { ErrorView } from './ErrorView';
import { ListFooterView } from './ListFooterView';
import { PendingLoader } from './PendingLoader';
import { useFetchMenus } from '../apis/getMenus';
import { MenuStatus } from '../types';

import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
import dayjs from '@/lib/dayjs';
import { sleep } from '@/utils/sleep';

export const MenuList = memo(() => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useFetchMenus({
    params: {
      statuses: [MenuStatus.CONFIRMED, MenuStatus.PENDING],
    },
  });

  // 表示データ一覧
  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        const menus = page.menus;
        for (const menu of menus) {
          // 1/31（水）のフォーマットにする
          let scheduleLabel = '';
          const scheduledAt = dayjs(menu.scheduledAt);
          if (scheduledAt.format('YYYY') === dayjs().format('YYYY')) {
            scheduleLabel = scheduledAt.format('M/D（ddd）');
          } else {
            scheduleLabel = scheduledAt.format('YYYY/M/D（ddd）');
          }
          const targetIndex = arr.findIndex((item) => item.title === scheduleLabel);
          if (targetIndex !== -1) {
            arr[targetIndex].data.push(menu);
          } else {
            arr.push({
              title: scheduleLabel,
              data: [menu],
            });
          }
        }
      }
    }
    return arr;
  }, [data]);

  // 次のページを取得
  const handleEndReached = useCallback(async () => {
    if (!isFetching) {
      // 2秒待機
      await sleep(2000);
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  // リフレッシュ
  const onRefresh = useCallback(async () => {
    if (isRefetching) return;
    setRefreshing(true);
    // 2秒待機
    await sleep(2000);
    refetch();
    setRefreshing(false);
  }, [isRefetching, refetch]);

  return (
    <>
      {/* ローディング中 */}
      {status === 'pending' ? (
        <PendingLoader />
      ) : (
        <>
          {/* エラー時 */}
          {status === 'error' ? (
            <ErrorView value={error?.message} />
          ) : (
            <>
              {/* データがない場合 */}
              {!displayData?.length ? (
                <EmptyView />
              ) : (
                <SectionList
                  sections={displayData}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  contentContainerStyle={{ paddingVertical: 16 }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={({ item }) => (
                    <Flex style={{ paddingVertical: 8, gap: 4 }}>
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() =>
                          router.push({
                            pathname: `/recipe_detail/${item.recipe.id}`,
                            params: {
                              ...item.recipe,
                              requesters: JSON.stringify(item.recipe.requesters),
                              user: JSON.stringify(item.recipe.user),
                            },
                          })
                        }>
                        <RecipeItem data={item.recipe} />
                      </Pressable>
                    </Flex>
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <NotoText style={{ fontSize: 16 }} fw="bold">
                      {title}
                    </NotoText>
                  )}
                  onEndReached={handleEndReached}
                  ListFooterComponent={() => (
                    <ListFooterView
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  )}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
});
