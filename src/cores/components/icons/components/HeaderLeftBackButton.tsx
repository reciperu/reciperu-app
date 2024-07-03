import { useNavigation } from 'expo-router';
import { memo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppIcon } from '..';
import { Flex } from '../../Flex';
import { NotoText } from '../../Text';

import { Constants } from '@/constants';

interface Props {
  onPress?: () => void;
}

export const HeaderLeftBackButton = memo<Props>(({ onPress }) => {
  const navigation = useNavigation();
  return (
    <Flex style={{ gap: 4, alignItems: 'center' }}>
      <AppIcon name="arrow-back" />
      <TouchableOpacity onPress={() => (onPress ? onPress() : navigation.goBack())}>
        <NotoText style={{ color: Constants.colors.primitive.pink[400] }}>戻る</NotoText>
      </TouchableOpacity>
    </Flex>
  );
});
