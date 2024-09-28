import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import HeaderLeft from '@/components/common/router/HeaderBack';

const SettingsLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      initialRouteName="settings"
      screenOptions={{ headerLeft: () => <HeaderLeft /> }}
    >
      <Stack.Screen
        name="settings"
        options={{
          title: t('titles.settings'),
          headerLargeTitle: true,
          headerBackTitle: t('titles.settings'),
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: t('titles.language'),
        }}
      />

      <Stack.Screen
        name="help"
        options={{
          title: t('titles.help'),
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
