import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StyledText } from '@/components/common/StyledText';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { ScreenHeight, ScreenWidth } from '@/constants/AppConstants';

const WelcomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace({
      pathname: '/(no-auth)/onboarding',
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors.background,
        },
      ]}
    >
      <LinearGradient
        colors={['#FAFAFA', 'rgba(250, 250, 250, 0.53)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View>
            <StyledText type="title" style={styles.title}>
              {t('welcome.title')}
              <StyledText type="title" style={styles.appName}>
                {t('welcome.title-highlight')}
              </StyledText>
            </StyledText>
            <StyledText style={styles.subtitle}>
              {t('welcome.subtitle')}
            </StyledText>
          </View>
          <Image
            source={require('@/assets/images/onboarding/getstarted.png')}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.buttonContainer}>
            <PressableOpacity style={styles.button} onPress={handleGetStarted}>
              <StyledText style={styles.buttonText}>
                {t('Get Started')}
              </StyledText>
            </PressableOpacity>
          </View>
          <StyledText style={styles.terms}>
            {t('welcome.tapping')} {'\n'}
            <StyledText style={styles.link}>
              {t('welcome.terms')}
            </StyledText> &{' '}
            <StyledText style={styles.link}>{t('welcome.privacy')}</StyledText>.
          </StyledText>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
  },
  appName: {
    fontSize: 28,
    color: '#13231B',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.7,
  },
  image: {
    width: ScreenWidth * 0.8,
    marginTop: 24,
    height: ScreenHeight * 0.7,
    flex: 1,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  terms: {
    fontSize: 11,
    textAlign: 'center',
    marginVertical: 16,
    opacity: 0.7,
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 11,
  },
});

export default WelcomeScreen;
