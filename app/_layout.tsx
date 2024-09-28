import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '@/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { getUserTrackingPermission } from '@/helpers/app-functions';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
function MainLayout() {
  const router = useRouter();
  useEffect(() => {
    // Get user tracking permission
    // Apple will reject the app if the user tracking permission is not requested
    getUserTrackingPermission();
    router.replace('/');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" animated />
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={'(no-auth)'}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(no-auth)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const RootLayout = () => {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
};

export default RootLayout;
