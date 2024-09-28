import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { StyledText } from '@/components/common/StyledText';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <LottieView
          source={require('@/assets/lotties/404.json')}
          style={styles.lottie}
          autoPlay
          loop
        />
        <StyledText type="title">{t('notFound')}</StyledText>
        <Link href="/(no-auth)/onboarding" style={styles.link}>
          <StyledText type="link">{t('goToHomeScreen')}</StyledText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
