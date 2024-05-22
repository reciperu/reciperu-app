import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const WindowOpen = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 3H4C2.897 3 2 3.897 2 5V19C2 20.103 2.897 21 4 21H9V19H4V7H20V19H15V21H20C21.103 21 22 20.103 22 19V5C22 3.897 21.103 3 20 3Z"
        fill={color}
      />
      <Path d="M13 21V16H16L12 11L8 16H11V21H13Z" fill={color} />
    </Svg>
  )
);
