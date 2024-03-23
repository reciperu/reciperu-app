import { memo } from 'react';

import { Add } from './components/Add';
import { Alert } from './components/Alert';
import { ArrowBack } from './components/ArrowBack';
import { Bell } from './components/Bell';
import { Bookmark } from './components/Bookmark';
import { BookmarkOutline } from './components/BookmarkOutline';
import { Calendar } from './components/Calendar';
import { Camera } from './components/Camera';
import { Checkmark } from './components/Checkmark';
import { CloseCircle } from './components/CloseCircle';
import { EmojiSad } from './components/EmojiSad';
import { FilledClose } from './components/FilledClose';
import { GoogleLogo } from './components/Google';
import { Home } from './components/Home';
import { InfoCircle } from './components/InfoCircle';
import { List } from './components/List';
import { ListCheck } from './components/ListCheck';
import { NewWindowArrow } from './components/NewWindowArrow';
import { Pencil } from './components/Pencil';
import { Recipe } from './components/Recipe';
import { Search } from './components/Search';
import { Warning } from './components/Warning';
import { AppIconNames, IconProps } from './types';
import { Close } from './components/Close';

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
  } else if (name === 'bell') {
    return <Bell {...rest} />;
  } else if (name === 'pencil') {
    return <Pencil {...rest} />;
  } else if (name === 'new-window-arrow') {
    return <NewWindowArrow {...rest} />;
  } else if (name === 'close-circle') {
    return <CloseCircle {...rest} />;
  } else if (name === 'emoji-sad') {
    return <EmojiSad {...rest} />;
  } else if (name === 'list') {
    return <List {...rest} />;
  } else if (name === 'bookmark') {
    return <Bookmark {...rest} />;
  } else if (name === 'bookmark-outline') {
    return <BookmarkOutline {...rest} />;
  } else if (name === 'search') {
    return <Search {...rest} />;
  } else if (name === 'add') {
    return <Add {...rest} />;
  } else if (name === 'close') {
    return <Close {...rest} />;
  }
  return <></>;
});
