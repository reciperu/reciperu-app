import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const ArrowBack = memo<IconProps>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.pink[400] }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path
          d="M11.8467 2.51334L10.6667 1.33334L4 8.00001L10.6667 14.6667L11.8467 13.4867L6.36 8.00001L11.8467 2.51334Z"
          fill={color}
        />
      </Svg>
    );
  }
);
