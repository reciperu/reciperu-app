import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

export const Camera = memo<Pick<IconProps, 'width' | 'height' | 'color'>>(
  ({ width = 16, height = 16, color = '#4A5568' }) => (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
        fill={color}
      />
      <Path
        d="M13.5 4.5H11.6562C11.5625 4.5 11.4462 4.43938 11.3556 4.34375L10.545 3.06437C10.5322 3.04407 10.5179 3.02475 10.5022 3.00656C10.2222 2.68 9.84375 2.5 9.4375 2.5H6.5625C6.15625 2.5 5.77781 2.68 5.49781 3.00656C5.48213 3.02475 5.46782 3.04407 5.455 3.06437L4.64437 4.34562C4.575 4.42125 4.4775 4.50187 4.375 4.50187V4.25187C4.375 4.11927 4.32232 3.99209 4.22855 3.89832C4.13479 3.80455 4.00761 3.75187 3.875 3.75187H3.125C2.99239 3.75187 2.86521 3.80455 2.77145 3.89832C2.67768 3.99209 2.625 4.11927 2.625 4.25187V4.50187H2.5C2.1023 4.50229 1.72101 4.66046 1.4398 4.94167C1.15858 5.22289 1.00041 5.60418 1 6.00187V12C1.00041 12.3977 1.15858 12.779 1.4398 13.0602C1.72101 13.3414 2.1023 13.4996 2.5 13.5H13.5C13.8977 13.4996 14.279 13.3414 14.5602 13.0602C14.8414 12.779 14.9996 12.3977 15 12V6C14.9996 5.6023 14.8414 5.22101 14.5602 4.9398C14.279 4.65858 13.8977 4.50041 13.5 4.5ZM8 11.5C7.40666 11.5 6.82664 11.3241 6.33329 10.9944C5.83994 10.6648 5.45542 10.1962 5.22836 9.64805C5.0013 9.09987 4.94189 8.49667 5.05764 7.91473C5.1734 7.33279 5.45912 6.79824 5.87868 6.37868C6.29824 5.95912 6.83279 5.6734 7.41473 5.55764C7.99667 5.44189 8.59987 5.5013 9.14805 5.72836C9.69623 5.95542 10.1648 6.33994 10.4944 6.83329C10.8241 7.32664 11 7.90666 11 8.5C10.9991 9.29537 10.6827 10.0579 10.1203 10.6203C9.5579 11.1827 8.79537 11.4991 8 11.5Z"
        fill={color}
      />
    </Svg>
  )
);