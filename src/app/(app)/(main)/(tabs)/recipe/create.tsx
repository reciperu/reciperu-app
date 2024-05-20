import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';
import { Stack, router } from 'expo-router';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { noop } from '@/functions/utils';

export default function RecipeCreatePage() {
  const isPresented = router.canGoBack();
  return (
    <>
      <Stack.Screen
        options={{
          title: 'レシピの追加',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => (
            <TouchableOpacity onPress={noop}>
              <NotoText fw="bold" style={styles.headerUpdateButton}>
                登録
              </NotoText>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
        <NotoText fw="bold" style={{ fontSize: 20, paddingHorizontal: 16, paddingTop: 12 }}>
          レシピ一覧
        </NotoText>
      </View>
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
