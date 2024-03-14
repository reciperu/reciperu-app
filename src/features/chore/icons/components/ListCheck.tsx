import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const ListCheck = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.pink[400] }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4.5 7H15.5V9H4.5V7ZM4.5 11H15.5V13H4.5V11ZM4.5 15H11.5V17H4.5V15ZM19.799 12.292L15.499 16.583L14.207 15.292L12.793 16.707L15.499 19.411L21.211 13.708L19.799 12.292Z"
          fill={color}
        />
      </Svg>
    );
  }
);
