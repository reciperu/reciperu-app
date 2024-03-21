import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const List = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.875 3.9375H3.375V2.8125H10.875V3.9375ZM10.875 6.5625H3.375V5.4375H10.875V6.5625ZM10.875 9.1875H3.375V8.0625H10.875V9.1875Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.125 3C1.125 2.79289 1.29289 2.625 1.5 2.625H2.25C2.45711 2.625 2.625 2.79289 2.625 3V3.75C2.625 3.95711 2.45711 4.125 2.25 4.125H1.5C1.29289 4.125 1.125 3.95711 1.125 3.75V3ZM1.125 5.625C1.125 5.41789 1.29289 5.25 1.5 5.25H2.25C2.45711 5.25 2.625 5.41789 2.625 5.625V6.375C2.625 6.58211 2.45711 6.75 2.25 6.75H1.5C1.29289 6.75 1.125 6.58211 1.125 6.375V5.625ZM1.125 8.25C1.125 8.04289 1.29289 7.875 1.5 7.875H2.25C2.45711 7.875 2.625 8.04289 2.625 8.25V9C2.625 9.20711 2.45711 9.375 2.25 9.375H1.5C1.29289 9.375 1.125 9.20711 1.125 9V8.25Z"
        fill={color}
      />
    </Svg>
  )
);
