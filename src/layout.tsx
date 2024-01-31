import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Portal } from 'react-native-paper';

import { Snackbar } from '@/components/Snackbar';
import useThemeVariant from '@/hooks/useThemeVariant';
import TabsNavigation from '@/navigators/tabs';

export default function MainLayout() {
  const { isDark } = useThemeVariant();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} animated />
      <TabsNavigation />
      <Portal>
        <Snackbar />
      </Portal>
    </>
  );
}
