import { memo } from 'react';

import { GoogleLogo } from './components/Google';
import { AppIconNames, IconProps } from './types';

interface Props extends IconProps {
  name: AppIconNames;
}

export const AppIcon = memo<Props>(({ name, ...rest }) => {
  if (name === 'google-logo') {
    return <GoogleLogo {...rest} />;
  }
  return <></>;
});
