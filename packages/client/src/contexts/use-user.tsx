import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import type { AuthContextType } from './auth-context';

interface UserContextInterface {
  user: NonNullable<AuthContextType['user']>;
  logout(): Promise<void>;
}

const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

export const CurrentUserProvider: FC<PropsWithChildren<UserContextInterface>> = ({ children, ...context }) => (
  <UserContext.Provider value={context}>{children}</UserContext.Provider>
);

export const useUser = () => useContext(UserContext);
