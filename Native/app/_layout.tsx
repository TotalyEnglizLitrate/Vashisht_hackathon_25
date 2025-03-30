import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack screenOptions={{
              // Hide the header for all other routes.
              headerShown: false,
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        
      
      </Stack>
    </>
  );
}
