// src/providers/app-store-provider.tsx
'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type AppStore, // Store type
  createAppStore, // Store creation function
  defaultInitState, // Default initial state
} from '@/stores/app-store'; // Ensure this points to the correct store file

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  // Initialize store with useRef to ensure it's only created once
  const storeRef = useRef<AppStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createAppStore(defaultInitState); // Use createAppStore with default state
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
};

// Custom hook to access the store using a selector
export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
