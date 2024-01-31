import React from 'react';
import { StyleSheet, View } from 'react-native';

import Alert from '@/components/Alert';

type TicketErrorAlertProps = {
  message: string;
};

export default function TicketErrorAlert({ message }: TicketErrorAlertProps) {
  return (
    <View style={styles.container}>
      <Alert text={message} type="error" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});
