import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera/next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import NoPermissionError from '@/components/NoPermissionError';
import useAppTheme from '@/hooks/useAppTheme';

type QrScannerProps = {
  onSuccessfulScan: (token: string) => void;
};

export default function QrScanner({ onSuccessfulScan }: QrScannerProps) {
  const theme = useAppTheme();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    void (async () => {
      if (!permission) await requestPermission();
    })();
  }, [permission, requestPermission]);

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashlight() {
    setFlashlightOn((current) => !current);
  }

  function handleScan(result: BarcodeScanningResult) {
    const token = result.data;
    if (!token) return;
    onSuccessfulScan(token);
  }

  if (!permission?.granted) return <NoPermissionError />;

  return (
    <CameraView
      style={styles.camera}
      type={facing}
      enableTorch={flashlightOn}
      barcodeScannerSettings={{ barCodeTypes: ['qr'] }}
      onBarcodeScanned={handleScan}
    >
      <View>
        <IconButton
          icon="camera-flip"
          mode="contained-tonal"
          iconColor="white"
          containerColor={theme.colors.primary}
          style={styles.switchCamera}
          onPress={toggleCameraFacing}
        />
        <IconButton
          icon={flashlightOn ? 'flashlight-off' : 'flashlight'}
          mode="contained-tonal"
          iconColor="white"
          containerColor={theme.colors.primary}
          style={styles.flashlight}
          onPress={toggleFlashlight}
        />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: { flex: 1 },
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  switchCamera: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  flashlight: {
    position: 'absolute',
    top: 72,
    left: 16,
  },
});
