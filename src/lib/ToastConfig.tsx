import { View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';
import { ToastWrapper } from '@/cores/components/Toast';
import { AppIcon } from '@/cores/components/icons';

export const toastConfig: ToastConfig = {
  successToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.green[300] }}>
      <AppIcon
        name="check-mark"
        width={18}
        height={18}
        color={Constants.colors.primitive.green[500]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  errorToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.red[300] }}>
      <AppIcon name="alert" width={18} height={18} color={Constants.colors.primitive.red[500]} />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  warningToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.orange[300] }}>
      <AppIcon
        name="warning"
        width={18}
        height={18}
        color={Constants.colors.primitive.orange[400]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
  infoToast: ({ text1, text2 }) => (
    <ToastWrapper style={{ borderColor: Constants.colors.primitive.blue[300] }}>
      <AppIcon
        name="info-circle"
        width={18}
        height={18}
        color={Constants.colors.primitive.blue[500]}
      />
      <View>
        <NotoText>{text1}</NotoText>
        {!!text2?.length && (
          <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
            {text2}
          </NotoText>
        )}
      </View>
    </ToastWrapper>
  ),
};
