'use client';

import { createContext, useContext, ReactNode } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export interface FirebaseProviderProps {
  children: ReactNode;
  value: FirebaseContextValue;
}

export function FirebaseProvider({ children, value }: FirebaseProviderProps) {
  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
}

export const useFirebase = (): FirebaseContextValue => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = (): FirebaseApp | null => {
  return useFirebase().firebaseApp;
}

export const useAuth = (): Auth | null => {
  return useFirebase().auth;
};

export const useFirestore = (): Firestore | null => {
  return useFirebase().firestore;
};

export interface FirebaseClientProviderProps {
    children: ReactNode;
}
  
let firebaseContextValue: FirebaseContextValue | null = null;

function initializeFirebaseClient(): FirebaseContextValue {
    if (firebaseContextValue) {
        return firebaseContextValue;
    }
    const { initializeFirebase } = require('@/firebase');
    const { firebaseApp, auth, firestore } = initializeFirebase();
    firebaseContextValue = { firebaseApp, auth, firestore };
    return firebaseContextValue;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
    const value = initializeFirebaseClient();
    return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}