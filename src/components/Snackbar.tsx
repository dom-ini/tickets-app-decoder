import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Snackbar as PaperSnackbar } from 'react-native-paper';

import { useSnackbar } from '@/hooks/useSnackbar';

type SnackbarProps = {
  style?: StyleProp<ViewStyle>;
};

export const Snackbar = ({ style }: SnackbarProps) => {
  const {
    controller: { text, ...props },
    queue,
  } = useSnackbar();

  return (
    <PaperSnackbar {...props} style={[styles.snackbar, style]}>
      {queue.length > 1 ? `(${queue.length}) ${text}` : text}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    marginBottom: 90,
  },
});
