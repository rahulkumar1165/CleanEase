'use client';

import { useState, useEffect, useRef } from 'react';
import { onSnapshot, doc, DocumentReference, DocumentData } from 'firebase/firestore';

const useMemoizedDocRef = (ref: DocumentReference | null) => {
    const refRef = useRef(ref);

    useEffect(() => {
        refRef.current = ref;
    }, [ref]);

    return refRef.current;
}

export function useDoc(ref: DocumentReference | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const docRef = useMemoizedDocRef(ref);

  useEffect(() => {

    if (docRef === null) {
        setData(null);
        setLoading(false);
        return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          setData(null);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, loading, error };
}
