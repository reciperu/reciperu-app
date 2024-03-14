import { memo } from 'react';
import { View } from 'react-native';

import { CheckListItem } from '@/features/chore/CheckList/components/Item';
import { CheckListItemObject } from '@/features/chore/CheckList/types';

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
