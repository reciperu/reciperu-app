import { useRouter } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl } from 'react-native';

import { EmptyView } from './EmptyView';
import { ErrorView } from './ErrorView';
import { ListFooterView } from './ListFooterView';
import { PendingLoader } from './PendingLoader';
import { useFetchMenus } from '../apis/getMenus';
import { MenuStatus } from '../types';

import { Flex } from '@/cores/components/Flex';
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
      statuses: [MenuStatus.CONFIRMED],
    },
  });

  // 表示データ一覧
  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        arr.push(...page.menus);
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
    console.log('refetch start');
    setRefreshing(true);
    // 2秒待機
    await sleep(2000);
    refetch();
    console.log('refetch stop');
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
                <FlatList
                  data={displayData}
                  contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={({ item }) => (
                    <Flex style={{ paddingVertical: 8, gap: 4 }}>
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() =>
                          router.push({
                            pathname: `recipe/${item.recipe.id}`,
                            params: {
                              ...item.recipe,
                              requesters: JSON.stringify(item.recipe.requesters),
                              user: JSON.stringify(item.recipe.user),
                            },
                          })
                        }>
                        {/* // TODO: menuコンポーネントを追加 */}
                        <></>
                      </Pressable>
                    </Flex>
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
