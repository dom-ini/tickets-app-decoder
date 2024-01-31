import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import TicketErrorAlert from '@/components/TicketErrorAlert';
import TicketInfo from '@/components/TicketInfo';
import { useTickets } from '@/hooks/useTickets';
import { TicketsStackParamList } from '@/navigators/types';
import i18n from '@/translations/i18n';
import { TicketError } from '@/types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TicketPageProps = NativeStackScreenProps<TicketsStackParamList, 'TicketDetails'>;

type ErrorMessages = { [Key in TicketError]: string };

const errorMessages: ErrorMessages = {
  qr: i18n.t('ticketError'),
  client: i18n.t('applicationError'),
  server: i18n.t('externalServiceError'),
};

export default function TicketPage({ navigation, route }: TicketPageProps) {
  const { getAndSave, loading, ticket, ticketError } = useTickets();
  const { token, scanned } = route.params;

  useFocusEffect(
    useCallback(() => {
      return () => navigation.getState().index > 0 && navigation.goBack();
    }, [navigation]),
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAndSaveTicket() {
      await getAndSave(token, { signal });
    }

    void fetchAndSaveTicket();

    return () => {
      controller.abort();
    };
  }, [token, getAndSave]);

  if (!loading && ticketError) return <TicketErrorAlert message={errorMessages[ticketError]} />;

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        ticket.data && (
          <TicketInfo ticket={ticket.data} showWarning={Boolean(scanned && ticket.existed)} />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});
