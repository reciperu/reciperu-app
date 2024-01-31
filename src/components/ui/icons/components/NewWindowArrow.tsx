import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../types';

import { Constants } from '@/constants';

export const NewWindowArrow = memo<IconProps>(
  ({ width = 24, height = 24, color = Constants.colors.primitive.pink[400] }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7559 5.24408C15.0814 5.56951 15.0814 6.09715 14.7559 6.42259L6.42259 14.7559C6.09715 15.0814 5.56951 15.0814 5.24408 14.7559C4.91864 14.4305 4.91864 13.9028 5.24408 13.5774L13.5774 5.24408C13.9028 4.91864 14.4305 4.91864 14.7559 5.24408Z"
          fill={color}
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 5.83333C5 5.3731 5.3731 5 5.83333 5H14.1667C14.6269 5 15 5.3731 15 5.83333V14.1667C15 14.6269 14.6269 15 14.1667 15C13.7064 15 13.3333 14.6269 13.3333 14.1667V6.66667H5.83333C5.3731 6.66667 5 6.29357 5 5.83333Z"
          fill={color}
        />
      </Svg>
    );
  }
);
