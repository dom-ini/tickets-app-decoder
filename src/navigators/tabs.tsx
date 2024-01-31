import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import useAppTheme from '@/hooks/useAppTheme';
import useThemeVariant from '@/hooks/useThemeVariant';
import TicketsNavigation from '@/navigators/tickets';
import { MainTabParamList } from '@/navigators/types';
import HomePage from '@/pages/home';
import ScanPage from '@/pages/scan';
import i18n from '@/translations/i18n';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

export default function TabsNavigation() {
  const theme = useAppTheme();
  const { isDark } = useThemeVariant();

  return (
    <Tab.Navigator
      activeColor={isDark ? 'white' : theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.primaryContainer }}
      shifting
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: 'home',
          title: i18n.t('home'),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanPage}
        options={{
          tabBarIcon: 'camera',
          title: i18n.t('scan'),
        }}
      />
      <Tab.Screen
        name="History"
        component={TicketsNavigation}
        options={{
          tabBarIcon: 'history',
          title: i18n.t('history'),
        }}
      />
    </Tab.Navigator>
  );
}
