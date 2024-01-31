import Constants from 'expo-constants';
import { Image } from 'expo-image';
import React from 'react';
import { ImageSourcePropType, SafeAreaView, StyleSheet, View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Icon, Text } from 'react-native-paper';

import useThemeVariant from '@/hooks/useThemeVariant';
import i18n from '@/translations/i18n';

const slideDown = {
  from: {
    translateY: -30,
  },
  to: {
    translateY: 0,
  },
};

export default function HomePage() {
  const { isDark } = useThemeVariant();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const logoSrc: ImageSourcePropType = isDark
    ? require('../../assets/img/logo-white.svg')
    : require('../../assets/img/logo.svg');

  return (
    <SafeAreaView style={styles.container}>
      <AnimatableView animation="bounceInLeft" direction="alternate">
        <Image source={logoSrc} style={styles.logo} contentFit="contain" />
      </AnimatableView>
      <View style={styles.scanInfo}>
        <Text variant="bodyLarge" style={styles.scanText}>
          {i18n.t('switchToScan')}
        </Text>
        <AnimatableView
          animation={slideDown}
          iterationCount="infinite"
          direction="alternate"
          easing="ease-in-out"
          iterationDelay={500}
          style={styles.scanArrow}
        >
          <Icon source="chevron-down" size={48} />
        </AnimatableView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 16,
    marginHorizontal: 16,
  },
  logo: {
    width: 300,
    maxWidth: '90%',
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50%',
  },
  scanInfo: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  scanText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  scanArrow: {
    marginTop: 40,
  },
});
