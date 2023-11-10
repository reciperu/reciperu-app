import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

export const Checkmark = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = '#CBD5E0' }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM10.2188 16.8928L6.44062 12.6942L7.55578 11.6906L10.1808 14.6072L16.4062 7.19344L17.5566 8.15625L10.2188 16.8928Z"
        fill={color}
      />
    </Svg>
  )
);
