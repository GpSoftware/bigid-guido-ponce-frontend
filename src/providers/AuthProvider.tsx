import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthService } from '../api/AuthService';

interface AuthContextType {
  accountName: string | null;
  accountEmail: string | null;
  isLoggedIn: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountEmail, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const saveToken = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const authenticate = useCallback(async () => {
    try {
      const { token, username, email } = await AuthService.singleton.authenticate();
      saveToken(token);
      setAccountName(username);
      setEmail(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      logout();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { token, username } = await AuthService.singleton.signIn(email, password);
      saveToken(token);
      setAccountName(username);
      setEmail(email);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const signUp = async (email: string, username: string, password: string) => {
    try {
      const { token, username: name } = await AuthService.singleton.signUp(email, username, 1, password);
      saveToken(token);
      setAccountName(name);
      setEmail(email);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;
    (async () => {
      await authenticate();
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    })();
  }, [authenticate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, signIn, logout, signUp, accountName, accountEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
