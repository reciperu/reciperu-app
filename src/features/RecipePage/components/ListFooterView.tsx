import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';
import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const ListFooterView = memo<Props>(({ hasNextPage, isFetchingNextPage }) => {
  return (
    <View style={{ paddingVertical: 12 }}>
      {!hasNextPage ? (
        <NotoText
          style={{
            fontSize: 12,
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
