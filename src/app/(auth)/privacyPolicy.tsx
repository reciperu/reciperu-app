import { Stack } from 'expo-router';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
        }}
      />
      <WebView
        style={styles.container}
        source={{ uri: 'https://ryotanny.notion.site/bf33d3830eb8492cb28872569e875179' }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
