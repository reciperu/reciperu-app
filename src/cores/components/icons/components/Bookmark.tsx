import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const Bookmark = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M9.375 11.25C9.28328 11.2503 9.19465 11.2169 9.12586 11.1562L6 8.3768L2.87414 11.1562C2.82005 11.2043 2.7532 11.2357 2.68165 11.2467C2.6101 11.2576 2.53692 11.2476 2.47094 11.2179C2.40495 11.1881 2.34898 11.1399 2.30978 11.0791C2.27057 11.0183 2.24981 10.9474 2.25 10.875V2.25C2.25044 1.85231 2.40861 1.47103 2.68982 1.18982C2.97103 0.908609 3.35231 0.750434 3.75 0.75H8.25C8.64769 0.750434 9.02897 0.908609 9.31018 1.18982C9.59139 1.47103 9.74957 1.85231 9.75 2.25V10.875C9.75 10.9745 9.71049 11.0698 9.64017 11.1402C9.56984 11.2105 9.47446 11.25 9.375 11.25Z"
        fill={color}
      />
    </Svg>
  )
);
