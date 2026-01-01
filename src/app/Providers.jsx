'use client';

import { Provider as ReduxProvider } from 'react-redux';
import store from '@/utils/store/store';
import { CMSContext } from './CMSContext';
import { useMemo } from 'react';
import UserAuthProvider from './UserAuthProvider';
import { AppToastProvider } from './AppToastContext';
import AppToast from '@/components/AppToast';

export default function Providers({ children, cms }) {
  const cmsValue = useMemo(() => cms, [cms]);

  return (
    <ReduxProvider store={store}>
      <AppToastProvider>
        <CMSContext.Provider value={cmsValue}>
          <UserAuthProvider>
            {children}

            {/* ✅ TOAST MUST BE INSIDE PROVIDER */}
            <AppToast darkMode={false} />
          </UserAuthProvider>
        </CMSContext.Provider>
      </AppToastProvider>
    </ReduxProvider>
  );
}
