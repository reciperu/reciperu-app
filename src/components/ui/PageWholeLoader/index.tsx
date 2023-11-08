import { memo } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';

export const PageWholeLoader = memo(() => {
  const { width, height } = Dimensions.get('window');
  return (
    <SafeAreaView style={{ width, height, position: 'absolute', top: 0, left: 0 }}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Constants.colors.primitive.pink[400]} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
