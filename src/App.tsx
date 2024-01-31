import { registerRootComponent } from 'expo';
import React from 'react';

import MainLayout from '@/layout';
import Providers from '@/providers';

export default function App() {
  return (
    <Providers>
      <MainLayout />
    </Providers>
  );
}

registerRootComponent(App);
