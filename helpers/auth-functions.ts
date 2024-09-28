import { router } from 'expo-router';

export const login = () => {
  router.replace('/(auth)/(tabs)/home');
};

export const logout = () => {
  router.replace('/');
};
