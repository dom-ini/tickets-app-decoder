import { useTheme } from 'react-native-paper';

import { CustomThemeProp } from '@/themes';

const useAppTheme = () => useTheme<CustomThemeProp>();

export default useAppTheme;
