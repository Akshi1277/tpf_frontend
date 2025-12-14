'use client';

import { createContext, useContext } from 'react';

export const CMSContext = createContext([]);

export function useCMS() {
  const cms = useContext(CMSContext);

  if (!cms) {
    throw new Error('useCMS must be used within CMSContext.Provider');
  }

  return cms;
}
