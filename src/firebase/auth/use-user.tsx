'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase/provider';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!firestore || !user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const userProfileRef = doc(firestore, `users/${user.uid}`);
    const unsubscribe = onSnapshot(userProfileRef, (snapshot) => {
      setUserProfile(snapshot.data() || null);
      setLoading(false);
    }, () => {
      // On error
      setUserProfile(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, user]);

  return { user, userProfile, loading };
}
