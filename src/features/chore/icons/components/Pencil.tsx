import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const Pencil = memo<IconProps>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[600] }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
        <Path
          d="M1.5 8.62525V10.5002H3.375L8.905 4.97025L7.03 3.09525L1.5 8.62525ZM10.355 2.81525L9.185 1.64525C9.13874 1.59889 9.0838 1.56212 9.02331 1.53703C8.96283 1.51194 8.89798 1.49902 8.8325 1.49902C8.76702 1.49902 8.70217 1.51194 8.64169 1.53703C8.5812 1.56212 8.52626 1.59889 8.48 1.64525L7.565 2.56025L9.44 4.43525L10.355 3.52025C10.4014 3.47399 10.4381 3.41904 10.4632 3.35856C10.4883 3.29807 10.5012 3.23323 10.5012 3.16775C10.5012 3.10226 10.4883 3.03742 10.4632 2.97693C10.4381 2.91645 10.4014 2.8615 10.355 2.81525Z"
          fill={color}
        />
      </Svg>
    );
  }
);
