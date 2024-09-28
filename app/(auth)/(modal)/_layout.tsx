import React from 'react';
import { Stack } from 'expo-router';
import HeaderLeft from '@/components/common/router/HeaderBack';

const ModalLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: 'card' }}>
      <Stack.Screen
        name="scan"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="gallery"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Gallery',
          headerLeft: () => <HeaderLeft />,
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
