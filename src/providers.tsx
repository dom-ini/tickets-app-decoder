import React, { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { SnackbarProvider } from '@/contexts/snackbar';
import { TicketsProvider } from '@/contexts/tickets';
import useThemeVariant from '@/hooks/useThemeVariant';
import { darkTheme, lightTheme } from '@/themes';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
} from '@react-navigation/native';

export default function Providers({ children }: { children: ReactNode }) {
  const { isDark } = useThemeVariant();
  const theme = isDark ? darkTheme : lightTheme;
  const navigationTheme = isDark ? NavigationDarkTheme : NavigationLightTheme;

  return (
    <SnackbarProvider>
      <TicketsProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={navigationTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </TicketsProvider>
    </SnackbarProvider>
  );
}
