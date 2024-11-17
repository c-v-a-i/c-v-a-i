import React, { createContext, useEffect, useState } from 'react';
import type { GetCurrentUserQuery, User } from '../generated/graphql';
import { GetCurrentUserDocument } from '../generated/graphql';
import { LogoutDocument } from '../generated/graphql';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

interface AuthContextType {
  user: GetCurrentUserQuery['currentUser'] | null;
  loading: boolean;
  error: Error | undefined;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { loading, data, error } = useQuery<GetCurrentUserQuery>(GetCurrentUserDocument, {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
    context: {
      credentials: 'include',
    },
  });

  const [logoutMutation] = useMutation(LogoutDocument, {
    context: { credentials: 'include' },
  });

  const logout = async () => {
    await logoutMutation();
    setUser(null);
  };

  useEffect(() => {
    setUser(data?.currentUser ?? null);
  }, [data?.currentUser]);

  return <AuthContext.Provider value={{ user, loading, error, logout }}>{children}</AuthContext.Provider>;
};
