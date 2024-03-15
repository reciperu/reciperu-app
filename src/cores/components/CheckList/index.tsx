import { memo } from 'react';
import { View } from 'react-native';

import { CheckListItem } from '@/cores/components/CheckList/components/Item';
import { CheckListItemObject } from '@/cores/components/CheckList/types';

interface Props {
  data: CheckListItemObject[];
}

export const CheckList = memo<Props>(({ data }) => {
  return (
    <View>
      {data.map((item, index) => {
        return <CheckListItem key={index} {...item} />;
      })}
    </View>
  );
});
