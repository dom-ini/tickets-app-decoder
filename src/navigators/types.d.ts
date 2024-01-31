import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: MainTabParamList;
};

export type MainTabParamList = {
  Home: undefined;
  Scan: undefined;
  History: NavigatorScreenParams<TicketsStackParamList>;
};

export type TicketsStackParamList = {
  TicketHistory: undefined;
  TicketDetails: { token: string; scanned?: boolean };
};
