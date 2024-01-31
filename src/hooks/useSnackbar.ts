import { useContext } from 'react';

import { SnackbarContext } from '@/contexts/snackbar';

export const useSnackbar = () => useContext(SnackbarContext);
