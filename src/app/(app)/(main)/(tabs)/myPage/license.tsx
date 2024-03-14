import { FlatList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import licenseFile from '../../../../../../licenses.json';

import { Container } from '@/features/chore/Container';

type License = {
  [key: string]: {
    licenses?: string;
    repository?: string;
    publisher?: string;
    url?: string;
    path?: string;
  };
};

export default function LicensePage() {
  const license: License = licenseFile;
  const licenseKeys = Object.keys(license);
  return (
    <Container needBottomPadding={false}>
      <View style={{ position: 'relative' }}>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']}
          style={{ width: '100%', height: 32, position: 'absolute', zIndex: 99 }}
        />
        <FlatList
          data={licenseKeys}
          style={{ paddingTop: 24, height: '100%' }}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.license}>
              <Text style={[styles.licenseName, styles.text]}>{item}</Text>
              <Text style={styles.text}>{license[item].licenses}</Text>
              <Text style={styles.text}>{license[item].repository}</Text>
              <Text style={styles.text}>{license[item].publisher}</Text>
              <Text style={styles.text}>{license[item].url}</Text>
            </View>
          )}
        />
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
          style={{ width: '100%', height: 32, position: 'absolute', bottom: 0, zIndex: 99 }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  license: {
    padding: 0,
  },
  licenseName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  text: {
    color: 'black',
    fontSize: 12,
  },
});
