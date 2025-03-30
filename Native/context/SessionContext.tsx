import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SessionContextType {
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Add any session initialization logic here
        await AsyncStorage.getItem('session');
        setInitialized(true);
      } catch (error) {
        console.error('Session initialization error:', error);
      }
    };

    initializeSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isInitialized, setInitialized }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
} 