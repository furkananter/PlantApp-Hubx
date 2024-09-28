import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import {
  HomeIcon,
  DiagnoseIcon,
  ScanIcon,
  MyGardenIcon,
  ProfileIcon,
} from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import HeaderRight from '@/components/common/router/HeaderSettings';

const TabLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.tint,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: t('bottomBar.home'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          headerShown: false,
          tabBarLabel: t('bottomBar.diagnose'),
          tabBarIcon: ({ color, focused }) => (
            <DiagnoseIcon size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => <ScanIcon size={28} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/(auth)/(modal)/scan');
          },
        })}
      />

      <Tabs.Screen
        name="mygarden"
        options={{
          title: t('titles.mygarden'),
          headerShown: false,
          tabBarLabel: t('bottomBar.myGarden'),
          tabBarIcon: ({ color, focused }) => (
            <MyGardenIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('bottomBar.profile'),
          headerRight: () => <HeaderRight />,
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
