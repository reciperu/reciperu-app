import { Stack, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { CheckListItemObject } from '@/components/ui/CheckList/types';
import { Flex } from '@/components/ui/Flex';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';

const CheckListData: CheckListItemObject[] = [
  {
    checked: true,
    value: 'あなたのための料理本を作ることができます',
  },
  {
    checked: true,
    value: '食べたい料理を提案できます',
  },
  {
    checked: true,
    value: '今日の献立を共有することができます',
  },
];

export default function OnboardingCreateSpacePage() {
  return (
    <>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Text fw="bold" style={styles.pageTitle}>
          次に、あなたの料理本を作成しましょう
        </Text>
        <View style={styles.contentWrapper}>
          <Flex style={styles.checkListWrapper}>
            <CheckList data={CheckListData} />
          </Flex>
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={() => router.push('/(onboarding)/(createBook)/title')}>
            新規で料理本を作成する
          </Button>
          <Button
            variant="others"
            onPress={() => router.push('/(onboarding)/(joinBook)/description')}>
            他の人が作った料理本を見る
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 50 },
  pageTitle: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  contentWrapper: { marginTop: 36 },
  checkListWrapper: {
    justifyContent: 'center',
  },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
