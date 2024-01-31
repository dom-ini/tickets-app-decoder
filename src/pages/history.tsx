import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import RemoveAllFAB from '@/components/RemoveAllFAB';
import TicketListItem from '@/components/TicketListItem';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useTickets } from '@/hooks/useTickets';
import { TicketsStackParamList } from '@/navigators/types';
import i18n from '@/translations/i18n';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HistoryPageProps = NativeStackScreenProps<TicketsStackParamList, 'TicketHistory'>;

export default function HistoryPage({ navigation }: HistoryPageProps) {
  const { ticketsList, removeAll, remove } = useTickets();
  const snackbar = useSnackbar();

  function handleDelete(token: string) {
    remove(token);
    snackbar.enqueue(i18n.t('entryDeleted'));
  }

  function handleDeleteAll() {
    removeAll();
    snackbar.enqueue(i18n.t('allEntriesDeleted'));
  }

  return (
    <SafeAreaView style={styles.container}>
      {ticketsList.length > 0 ? (
        <>
          <FlatList
            data={ticketsList}
            renderItem={({ item }) => (
              <TicketListItem
                key={item.token}
                ticket={item}
                onPress={() => navigation.navigate('TicketDetails', { token: item.token })}
                onDelete={handleDelete}
              />
            )}
          />
          <RemoveAllFAB onPress={handleDeleteAll} style={styles.removeAll} />
        </>
      ) : (
        <View style={styles.emptyTickets}>
          <Text>{i18n.t('ticketsEmpty')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyTickets: {
    margin: 16,
  },
  removeAll: {
    bottom: 16,
    right: 16,
  },
});
