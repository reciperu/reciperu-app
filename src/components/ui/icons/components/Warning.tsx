import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const Warning = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.gray[300] }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        d="M21.05 18.7069L13.0611 3.87094C12.4948 2.81906 10.9864 2.81906 10.4197 3.87094L2.43122 18.7069C2.30827 18.9352 2.24663 19.1916 2.25231 19.4508C2.258 19.7101 2.33081 19.9635 2.46365 20.1863C2.59648 20.409 2.7848 20.5935 3.01022 20.7217C3.23564 20.85 3.49046 20.9176 3.74981 20.918H19.729C19.9886 20.918 20.2437 20.8507 20.4694 20.7226C20.6952 20.5945 20.8838 20.4101 21.0169 20.1873C21.15 19.9644 21.2231 19.7109 21.2289 19.4514C21.2346 19.1919 21.173 18.9354 21.05 18.7069V18.7069ZM11.7406 18.6211C11.5552 18.6211 11.3739 18.5661 11.2197 18.4631C11.0656 18.3601 10.9454 18.2137 10.8745 18.0424C10.8035 17.8711 10.7849 17.6826 10.8211 17.5007C10.8573 17.3188 10.9466 17.1518 11.0777 17.0207C11.2088 16.8896 11.3758 16.8003 11.5577 16.7641C11.7396 16.7279 11.9281 16.7465 12.0994 16.8175C12.2707 16.8884 12.4171 17.0086 12.5201 17.1627C12.6231 17.3169 12.6781 17.4982 12.6781 17.6836C12.6781 17.8067 12.6538 17.9286 12.6067 18.0424C12.5596 18.1561 12.4906 18.2595 12.4035 18.3465C12.3164 18.4336 12.2131 18.5026 12.0994 18.5497C11.9856 18.5968 11.8637 18.6211 11.7406 18.6211ZM12.7587 9.19219L12.4897 14.9109C12.4897 15.1099 12.4106 15.3006 12.27 15.4413C12.1293 15.5819 11.9386 15.6609 11.7397 15.6609C11.5407 15.6609 11.35 15.5819 11.2093 15.4413C11.0687 15.3006 10.9897 15.1099 10.9897 14.9109L10.7206 9.19453C10.7145 9.05793 10.7361 8.92151 10.7839 8.79341C10.8317 8.6653 10.9048 8.54813 10.9988 8.44888C11.0929 8.34963 11.2059 8.27033 11.3313 8.2157C11.4566 8.16108 11.5917 8.13225 11.7284 8.13094H11.7382C11.8759 8.13087 12.0122 8.15869 12.1388 8.21272C12.2654 8.26675 12.3797 8.34587 12.4749 8.44531C12.5701 8.54475 12.6442 8.66245 12.6926 8.7913C12.7411 8.92015 12.7629 9.05748 12.7568 9.195L12.7587 9.19219Z"
        fill={color}
      />
    </Svg>
  )
);
