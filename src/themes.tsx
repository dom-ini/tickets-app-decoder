import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { MD3Colors, ThemeProp } from 'react-native-paper/lib/typescript/types';

import colors from '@/constants/colors';

export type CustomThemeProp = ThemeProp & {
  colors: MD3Colors & {
    warning: string;
    onWarning: string;
  };
};

const baseTheme: Pick<ThemeProp, 'roundness'> = {
  roundness: 0,
};

export const lightTheme: CustomThemeProp = {
  ...MD3LightTheme,
  ...baseTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.PRIMARY,
    onPrimary: colors.PRIMARY_COLOR,
    primaryContainer: colors.PRIMARY_BG,
    secondary: colors.SECONDARY,
    secondaryContainer: colors.PRIMARY_TINT,
    warning: colors.WARNING,
    onWarning: colors.WARNING_COLOR,
  },
};

export const darkTheme: CustomThemeProp = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.PRIMARY_DARK,
    onPrimary: colors.PRIMARY_COLOR_DARK,
    primaryContainer: colors.PRIMARY_BG_DARK,
    secondary: colors.SECONDARY_DARK,
    secondaryContainer: colors.PRIMARY_TINT_DARK,
    warning: colors.WARNING_DARK,
    onWarning: colors.WARNING_COLOR_DARK,
  },
};
