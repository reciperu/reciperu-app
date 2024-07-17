import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const ListFooterView = memo<Props>(({ hasNextPage, isFetchingNextPage }) => {
  return (
    <View style={{ paddingVertical: 24 }}>
      {!hasNextPage ? (
        <NotoText
          style={{
            fontSize: 14,
            color: Constants.colors.primitive.gray[400],
            textAlign: 'center',
          }}>
          すべてのレシピを取得しました
        </NotoText>
      ) : (
        <>
          {isFetchingNextPage ? (
            <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
          ) : null}
        </>
      )}
    </View>
  );
});
