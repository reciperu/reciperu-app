import { ICON_NAME_LIST } from '../constant';

export interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  variant?: 'filled' | 'outline';
}

export type AppIconNames = (typeof ICON_NAME_LIST)[number];
