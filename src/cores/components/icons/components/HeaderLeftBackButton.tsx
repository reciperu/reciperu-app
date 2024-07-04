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
    <TouchableOpacity onPress={() => (onPress ? onPress() : navigation.goBack())}>
      <Flex style={{ gap: 2, alignItems: 'center', paddingRight: 4 }}>
        <AppIcon name="arrow-back" width={18} height={18} />
        <NotoText style={{ color: Constants.colors.primitive.pink[400], paddingBottom: 1 }}>
          戻る
        </NotoText>
      </Flex>
    </TouchableOpacity>
  );
});
