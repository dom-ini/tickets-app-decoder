import { useColorScheme } from 'react-native';

export default function useThemeVariant() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    isDark,
  };
}
