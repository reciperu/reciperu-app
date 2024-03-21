import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const BookmarkOutline = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.68934 1.18934C2.97064 0.908035 3.35218 0.75 3.75 0.75H8.25C8.64782 0.75 9.02936 0.908035 9.31066 1.18934C9.59196 1.47064 9.75 1.85218 9.75 2.25V10.875C9.75 11.0227 9.66333 11.1566 9.52862 11.2171C9.39391 11.2776 9.23624 11.2534 9.12586 11.1553L6 8.37673L2.87414 11.1553C2.76377 11.2534 2.60609 11.2776 2.47138 11.2171C2.33667 11.1566 2.25 11.0227 2.25 10.875V2.25C2.25 1.85218 2.40804 1.47064 2.68934 1.18934ZM3.75 1.5C3.55109 1.5 3.36032 1.57902 3.21967 1.71967C3.07902 1.86032 3 2.05109 3 2.25V10.0399L5.75086 7.59472C5.89295 7.46843 6.10705 7.46843 6.24914 7.59472L9 10.0399V2.25C9 2.05109 8.92098 1.86032 8.78033 1.71967C8.63968 1.57902 8.44891 1.5 8.25 1.5H3.75Z"
        fill={color}
      />
    </Svg>
  )
);
