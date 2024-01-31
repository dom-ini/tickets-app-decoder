import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import Alert from '@/components/Alert';
import useAppTheme from '@/hooks/useAppTheme';
import i18n from '@/translations/i18n';
import { Ticket } from '@/types';

type TicketInfoProps = {
  ticket: Ticket;
  showWarning: boolean;
};

export default function TicketInfo({ ticket, showWarning }: TicketInfoProps) {
  const theme = useAppTheme();
  const eventUrl = `${process.env.EXPO_PUBLIC_FRONT_URL}/wydarzenie/${ticket.eventSlug}`;

  return (
    <View>
      {showWarning && (
        <Alert style={styles.alert} text={i18n.t('ticketAlreadyScanned')} type="warning" />
      )}
      <View style={styles.property}>
        <Text variant="labelLarge">{i18n.t('scannedAt')}</Text>
        <Text variant="bodyLarge">{ticket.scannedAt.toLocaleString()}</Text>
      </View>
      <View style={styles.property}>
        <Text variant="labelLarge">{i18n.t('ticketCategory')}</Text>
        <Text variant="bodyLarge">{ticket.categoryName}</Text>
      </View>
      <View style={styles.property}>
        <Text variant="labelLarge">{i18n.t('event')}</Text>
        <Text
          style={{ color: theme.colors.primary }}
          onPress={() => Linking.openURL(eventUrl)}
          variant="bodyLarge"
        >
          {ticket.eventName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    marginBottom: 16,
  },
  property: {
    marginBottom: 16,
  },
});
