import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(settings)" />
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
