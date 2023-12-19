import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';

interface Props {
  name: string;
  icon: string;
}

export const Book = memo<Props>(({ name, icon }) => {
  return (
    <View style={styles.container}>
      <Text fw="bold" style={styles.title}>
        {name}
      </Text>
      {icon.length > 0 && (
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{ uri: 'https://source.unsplash.com/85J99sGggnw' }} />
        </View>
      )}
      <LinearGradient
        colors={[
          'rgba(106, 106, 106, 0.10)',
          'rgba(203, 203, 203, 0.08)',
          'rgba(255, 255, 255, 0.40)',
          'rgba(255, 255, 255, 0.30)',
          'rgba(255, 255, 255, 0.10)',
          'rgba(255, 255, 255, 0)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.02, 0.05, 0.09, 0.18, 1]}
        style={styles.gradientOverlay}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 367,
    position: 'relative',
    backgroundColor: Constants.colors.primitive.pink['50'],
    borderRadius: Constants.radius['lg'],
    /* shadow */
    shadowColor: '#000',
    shadowOffset: {
      width: -8,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 4,
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  gradientOverlay: {
    width: 260,
    height: 367,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: Constants.radius['base'],
  },
});
