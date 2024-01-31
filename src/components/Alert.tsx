import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Surface, Text } from 'react-native-paper';

import useAppTheme from '@/hooks/useAppTheme';

type AlertTypes = 'warning' | 'error';

type AlertProps = {
  text: string;
  type: AlertTypes;
  style?: StyleProp<ViewStyle>;
};

type AlertColors = {
  [Key in AlertTypes]: {
    background: string;
    color: string;
  };
};

type IconSources = {
  [Key in AlertTypes]: string;
};

const iconSources: IconSources = {
  warning: 'exclamation-thick',
  error: 'exclamation-thick',
};

export default function Alert({ text, type, style }: AlertProps) {
  const theme = useAppTheme();
  const colors: AlertColors = {
    warning: {
      background: theme.colors.warning,
      color: theme.colors.onWarning,
    },
    error: {
      background: theme.colors.error,
      color: theme.colors.onError,
    },
  };

  return (
    <Surface style={[styles.alert, style, { backgroundColor: colors[type].background }]}>
      <View style={styles.alertIcon}>
        <Icon source={iconSources[type]} size={24} color={colors[type].color} />
      </View>
      <Text variant="bodyMedium" style={[styles.alertText, { color: colors[type].color }]}>
        {text}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  alert: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  alertIcon: {
    marginHorizontal: 8,
  },
  alertText: {
    flex: 1,
  },
});
