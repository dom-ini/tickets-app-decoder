import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import i18n from '@/translations/i18n';

export default function NoPermissionError() {
  async function openSettings() {
    await Linking.openSettings();
  }

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.noPermissionText}>
        {i18n.t('permissionRequired')}
      </Text>
      <Text variant="bodyMedium" style={styles.noPermissionText}>
        {i18n.t('goToSettings')}
      </Text>
      <Button onPress={openSettings}>{i18n.t('openSettings')}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  noPermissionText: { marginBottom: 16 },
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
