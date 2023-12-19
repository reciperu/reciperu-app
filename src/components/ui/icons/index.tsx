import { memo } from 'react';

import { ArrowBack } from './components/ArrowBack';
import { Calendar } from './components/Calendar';
import { Camera } from './components/Camera';
import { Checkmark } from './components/Checkmark';
import { FilledClose } from './components/FilledClose';
import { GoogleLogo } from './components/Google';
import { Home } from './components/Home';
import { ListCheck } from './components/ListCheck';
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
  } else if (name === 'camera') {
    return <Camera {...rest} />;
  } else if (name === 'check-mark') {
    return <Checkmark {...rest} />;
  } else if (name === 'list-check') {
    return <ListCheck {...rest} />;
  } else if (name === 'arrow-back') {
    return <ArrowBack {...rest} />;
  } else if (name === 'filled-close') {
    return <FilledClose {...rest} />;
  }
  return <></>;
});
