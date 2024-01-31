import React, { useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { FAB, Portal } from 'react-native-paper';

import RemoveAllDialog from '@/components/RemoveAllDialog';

type RemoveAllFABProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function RemoveAllFAB({ onPress, style }: RemoveAllFABProps) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const onFABPress = () => {
    setDialogVisible(true);
  };

  const onConfirm = () => {
    onPress();
    setDialogVisible(false);
  };

  const onCancel = () => {
    setDialogVisible(false);
  };

  return (
    <>
      <FAB
        icon="delete"
        onPress={onFABPress}
        style={[styles.fab, style]}
        theme={{ roundness: 10 }}
      />
      <Portal>
        <RemoveAllDialog visible={dialogVisible} onConfirm={onConfirm} onCancel={onCancel} />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
  },
});
