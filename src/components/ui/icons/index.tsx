import { memo } from 'react';

import { Alert } from './components/Alert';
import { ArrowBack } from './components/ArrowBack';
import { Calendar } from './components/Calendar';
import { Camera } from './components/Camera';
import { Checkmark } from './components/Checkmark';
import { FilledClose } from './components/FilledClose';
import { GoogleLogo } from './components/Google';
import { Home } from './components/Home';
import { InfoCircle } from './components/InfoCircle';
import { ListCheck } from './components/ListCheck';
import { Recipe } from './components/Recipe';
import { Warning } from './components/Warning';
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
  } else if (name === 'alert') {
    return <Alert {...rest} />;
  } else if (name === 'info-circle') {
    return <InfoCircle {...rest} />;
  } else if (name === 'warning') {
    return <Warning {...rest} />;
  }
  return <></>;
});
