import * as React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TermsPage() {
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: 'https://ryotanny.notion.site/684b04dcdc7a4212a2c6334a5743b9c8' }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
