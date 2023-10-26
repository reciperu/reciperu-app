import { memo } from 'react';

import { Calendar } from './components/Calendar';
import { GoogleLogo } from './components/Google';
import { Home } from './components/Home';
import { Recipe } from './components/Recipe';
import { AppIconNames, IconProps } from './types';

interface Props extends IconProps {
  name: AppIconNames;
}

export const AppIcon = memo<Props>(({ name, ...rest }) => {
  if (name === 'google-logo') {
    return <GoogleLogo {...rest} />;
  } else if (name === 'home') {
    return <Home {...rest} />;
  } else if (name === 'recipe') {
    return <Recipe {...rest} />;
  } else if (name === 'calendar') {
    return <Calendar {...rest} />;
  }
  return <></>;
});
