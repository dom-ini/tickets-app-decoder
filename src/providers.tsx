import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#183ee7',
    secondary: '#4665ec',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
