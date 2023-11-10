import { memo } from 'react';
import { View } from 'react-native';

import { CheckListItem } from '@/components/ui/CheckList/components/Item';
import { CheckListItemObject } from '@/components/ui/CheckList/types';

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
