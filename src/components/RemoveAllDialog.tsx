import React from 'react';
import { Button, Dialog, Text } from 'react-native-paper';

import i18n from '@/translations/i18n';

type RemoveAllDialogProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function RemoveAllDialog({ visible, onConfirm, onCancel }: RemoveAllDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onCancel}>
      <Dialog.Content>
        <Text variant="bodyMedium">{i18n.t('deleteAllEntriesConfirm')}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancel}>{i18n.t('cancel')}</Button>
        <Button onPress={onConfirm}>{i18n.t('yes')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
