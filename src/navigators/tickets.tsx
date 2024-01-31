import React from 'react';

import { TicketsStackParamList } from '@/navigators/types';
import HistoryPage from '@/pages/history';
import TicketPage from '@/pages/ticket';
import i18n from '@/translations/i18n';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<TicketsStackParamList>();

export default function TicketsNavigation() {
  return (
    <Stack.Navigator initialRouteName="TicketHistory">
      <Stack.Screen
        name="TicketHistory"
        component={HistoryPage}
        options={{ title: i18n.t('recentlyScanned') }}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketPage}
        options={{ title: i18n.t('ticketDetails') }}
      />
    </Stack.Navigator>
  );
}
