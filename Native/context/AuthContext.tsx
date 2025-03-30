import React, { createContext, useContext, useState } from 'react';

type User = {
  email: string;
  username: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const signIn = async (username: string, password: string) => {
    // TODO: Implement actual authentication
    setUser({ email: `${username}@example.com`, username });
  };

  const signUp = async (username: string, password: string) => {
    // TODO: Implement actual registration
    setUser({ email: `${username}@example.com`, username });
  };

  const signOut = async () => {
    try {
      // Clear any stored auth data here if needed
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 