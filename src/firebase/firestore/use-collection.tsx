'use client';

import { useState, useEffect, useRef } from 'react';
import { onSnapshot, Query, DocumentData } from 'firebase/firestore';

// A custom hook to memoize the query object.
// This is important to prevent infinite loops in useEffect.
const useMemoizedQuery = (q: Query | null) => {
  const queryRef = useRef(q);

  useEffect(() => {
    queryRef.current = q;
  }, [q]);

  return queryRef.current;
};

export function useCollection(q: Query | null) {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const query = useMemoizedQuery(q);

  useEffect(() => {
    if (query === null) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
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
  }, [query]);

  return { data, loading, error };
}
