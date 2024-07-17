import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { usePutSpace } from '../apis/putSpace';

import { Validation } from '@/constants/validation';
import { Button } from '@/cores/components/Button';
import { InputLabel } from '@/cores/components/InputLabel';
import { AppModal } from '@/cores/components/Modal';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  spaceName: string;
  spaceId?: number;
}

export const EditSpaceNameModal = memo<Props>(
  ({ isVisible, onClose, spaceName: spaceNameProps, spaceId }) => {
    const [spaceName, setSpaceName] = useState(spaceNameProps);
    const mutation = usePutSpace({});
    const queryClient = useQueryClient();

    useEffect(() => {
      if (isVisible && spaceNameProps.length) {
        setSpaceName(spaceNameProps);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handlePress = useCallback(async () => {
      if (spaceId !== undefined) {
        mutation.mutate(
          {
            id: spaceId,
            data: {
              name: spaceName,
            },
          },
          {
            onSuccess: () => {
              onClose();
              queryClient.invalidateQueries({
                queryKey: ['spaces', spaceId],
              });
            },
          }
        );
      }
    }, [spaceName, mutation, spaceId, onClose, queryClient]);

    return (
      <>
        <AppModal
          isVisible={isVisible}
          close={onClose}
          position="center"
          title={
            <NotoText fw="bold" style={{ fontSize: 16 }}>
              スペース名の変更
            </NotoText>
          }>
          <View style={{ marginBottom: 12 }}>
            <View style={styles.inputWrapper}>
              <InputLabel>スペース名</InputLabel>
              <TextInput
                value={spaceName}
                onChange={(text) => setSpaceName(text)}
                maxLength={Validation.SPACE_NAME.MAX_LENGTH.VALUE}
              />
            </View>
          </View>
          <Button disabled={!spaceName.length} loading={mutation.isPending} onPress={handlePress}>
            変更する
          </Button>
        </AppModal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 12,
    width: '100%',
  },
});
