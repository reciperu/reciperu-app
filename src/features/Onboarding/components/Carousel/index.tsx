import { Image } from 'expo-image';
import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

const { width: SLIDER_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SLIDER_WIDTH;

interface Props {
  data: {
    image: string;
    title: string;
  }[];
}

export const OnboardingCarousel = memo<Props>(({ data }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleDotPress = useCallback((selectedIndex: number) => {
    carouselRef.current.snapToItem(selectedIndex);
  }, []);
  const renderItem = ({
    item,
  }: {
    item: {
      image: string;
      title: string;
    };
  }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <NotoText fw="bold" style={styles.title}>
          {item.title}
        </NotoText>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        ref={carouselRef}
      />
      <CustomPagination dotsLength={data.length} activeIndex={index} onSelect={handleDotPress} />
    </View>
  );
});

interface CustomPaginationProps {
  dotsLength: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

const CustomPagination = memo<CustomPaginationProps>(({ dotsLength, activeIndex, onSelect }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: dotsLength }).map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  slide: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: 219,
  },
  title: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  // Pagination
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: Constants.radius['full'],
  },
  activeDot: {
    backgroundColor: Constants.colors.primitive.pink[400],
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: Constants.colors.primitive.gray[400],
  },
});
