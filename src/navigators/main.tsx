import React from 'react';

import TabsNavigation from '@/navigators/tabs';
import { RootStackParamList } from '@/navigators/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  );
}
