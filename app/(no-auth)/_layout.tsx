import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen
        name="paywall"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackVisible: false,
          headerTitle: '',
        }}
      />
    </Stack>
  );
};

export default Layout;
