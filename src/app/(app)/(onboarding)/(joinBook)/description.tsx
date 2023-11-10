import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';

export default function OnboardingJoinBookTopPage() {
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
        <View style={styles.contentWrapper}>{/*  */}</View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>{/*  */}</View>
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
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
