import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { CheckList } from '@/features/chore/CheckList';
import { Flex } from '@/features/chore/Flex';
import { NotoText } from '@/features/chore/Text';
import { AppIcon } from '@/features/chore/icons';

export const UserCheckList = memo(() => {
  // TODO: API経由でユーザーのチェックリストを取得する
  return (
    <View style={styles.container}>
      <Flex style={styles.titleWrapper}>
        <AppIcon name="list-check" />
        <NotoText fw="bold" style={styles.title}>
          チェックリスト
        </NotoText>
      </Flex>
      <Flex style={styles.checkListWrapper}>
        <View>
          <CheckList
            data={[
              {
                checked: true,
                value: 'レシピ集を共有で管理しよう',
              },
              {
                checked: false,
                value: 'レシピ集に料理を登録しよう',
              },
              {
                checked: false,
                value: '食べたい料理をハナコさんに提案しよう',
              },
              {
                checked: false,
                value: '献立を決めよう',
              },
            ]}
          />
        </View>
      </Flex>
    </View>
  );
});

export const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: Constants.colors.primitive.pink[50] },
  titleWrapper: { alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 16 },
  title: { color: Constants.colors.primitive.pink[400] },
  checkListWrapper: { justifyContent: 'center' },
});
