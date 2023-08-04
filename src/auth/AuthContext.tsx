import { createContext, useState } from 'react';

interface AuthContextValue {
  auth: { token: boolean };
  setAuth: React.Dispatch<React.SetStateAction<{ token: boolean }>>;
}

const initialAuth = { token: false };

export const AuthContext = createContext<AuthContextValue>({
  auth: initialAuth,
  setAuth: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
