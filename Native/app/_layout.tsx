import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
          </>
        ) : (
          // Main App Stack
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

