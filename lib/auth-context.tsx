'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authClient } from './auth-client';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  connectionCode: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          let connectionCode = data.user.connectionCode;
          
          // Se o connectionCode não veio da sessão, buscar do backend
          if (!connectionCode && data.user.id) {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`,
                {
                  credentials: 'include',
                }
              );
              if (response.ok) {
                const userData = await response.json();
                connectionCode = userData.connectionCode;
              }
            } catch (err) {
              console.warn('Erro ao buscar connectionCode:', err);
            }
          }
          
          setUser({
            id: data.user.id,
            name: data.user.name || '',
            email: data.user.email || '',
            connectionCode: connectionCode || 'N/A',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch session'));
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  const logout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to logout'));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
