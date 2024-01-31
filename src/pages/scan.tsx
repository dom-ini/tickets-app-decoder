import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MaterialBottomTabScreenProps } from 'react-native-paper';

import QrScanner from '@/components/QrScanner';
import { MainTabParamList } from '@/navigators/types';
import { useIsFocused } from '@react-navigation/native';

type ScanPageProps = MaterialBottomTabScreenProps<MainTabParamList, 'Scan'>;

export default function ScanPage({ navigation }: ScanPageProps) {
  const isFocused = useIsFocused();

  function onSuccessfulScan(token: string) {
    navigation.navigate('History', {
      screen: 'TicketDetails',
      params: { token, scanned: true },
      initial: false,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && <QrScanner onSuccessfulScan={onSuccessfulScan} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
