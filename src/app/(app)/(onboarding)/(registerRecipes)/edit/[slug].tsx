import { TouchableOpacity, View } from 'react-native';
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Text } from '@/components/ui/Text';

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  const { slug } = useLocalSearchParams();
  const navigation = useNavigation();

  console.log(`isPresented: ${isPresented}`);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Modal',
          headerLeft: isPresented
            ? () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text>戻る</Text>
                </TouchableOpacity>
              )
            : undefined,
        }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Blog post: {slug}</Text>
      </View>
    </>
  );
}
