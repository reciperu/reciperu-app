import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const Checkmark = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 0.25C4.62391 0.25 0.25 4.62391 0.25 10C0.25 15.3761 4.62391 19.75 10 19.75C15.3761 19.75 19.75 15.3761 19.75 10C19.75 4.62391 15.3761 0.25 10 0.25ZM8.21875 14.8928L4.44062 10.6942L5.55578 9.69062L8.18078 12.6072L14.4062 5.19344L15.5566 6.15625L8.21875 14.8928Z"
        fill={color}
      />
    </Svg>
  )
);
