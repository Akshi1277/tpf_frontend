'use client';

import { Provider as ReduxProvider } from 'react-redux';
import store from '@/utils/store/store';
import { CMSContext } from './CMSContext';
import { useMemo } from 'react';
import UserAuthProvider from './UserAuthProvider';

export default function Providers({ children, cms }) {
  // ✅ stable reference across renders
  const cmsValue = useMemo(() => cms, [cms]);

  return (
<ReduxProvider store={store}>
  <CMSContext.Provider value={cmsValue}>
    <UserAuthProvider>
      {children}
    </UserAuthProvider>
  </CMSContext.Provider>
</ReduxProvider>
  );
}
