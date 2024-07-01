import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { memo, useState } from 'react';

interface Props {
  width?: number;
  height?: number;
}

const assets = [
  require('assets/food/bento.webp'),
  require('assets/food/bowl.webp'),
  require('assets/food/cooking.webp'),
  require('assets/food/doughnut.webp'),
  require('assets/food/hamburger.webp'),
  require('assets/food/hot_dog.webp'),
  require('assets/food/oden.webp'),
  require('assets/food/pod_of_food.webp'),
  require('assets/food/salad.webp'),
  require('assets/food/sandwich.webp'),
  require('assets/food/shortcake.webp'),
  require('assets/food/spaghetti.webp'),
  require('assets/food/sushi.webp'),
];

export const FoodRandomImage = memo<Props>(({ width = 48, height = 48 }) => {
  const [index, setIndex] = useState(0);
  useFocusEffect(() => {
    const randomIndex = Math.floor(Math.random() * assets.length);
    setIndex(randomIndex);
  });
  return <Image source={assets[index]} style={{ width, height }} />;
});
