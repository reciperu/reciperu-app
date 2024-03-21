import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const Add = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.75 4.5V11.25H19.5V12.75H12.75V19.5H11.25V12.75H4.5V11.25H11.25V4.5H12.75Z"
        fill={color}
      />
    </Svg>
  )
);
