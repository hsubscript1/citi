// hooks/useStoreHydration.ts
import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useApp';

export const useStoreHydration = () => {
  const { setUser, setToken } = useAppStore();

  useEffect(() => {
    // 🔹 Hydrate token from localStorage
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      
      // 🔹 Fetch user data if token exists
      fetch("/api/fetcher-api", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
  }, [setUser, setToken]);
};