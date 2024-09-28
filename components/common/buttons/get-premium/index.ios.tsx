import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeInUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PressableOpacity from '../PressableOpacity';
import { BlurView } from 'expo-blur';
import { StyledText } from '@/components/common/StyledText';
import { useTranslation } from 'react-i18next';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GetPremium: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const gradientProgress = useSharedValue(0);

  useEffect(() => {
    gradientProgress.value = withRepeat(
      withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedGradientStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${gradientProgress.value * 360}deg` }],
  }));

  return (
    <Animated.View style={styles.container} entering={FadeInUp.duration(1000)}>
      <PressableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: '/paywall' })}
      >
        <AnimatedLinearGradient
          colors={['#24201A', '#D9A846']}
          style={[StyleSheet.absoluteFill, animatedGradientStyle]}
        />
        <BlurView style={styles.contentContainer} intensity={80} tint="dark">
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Ionicons name="mail" size={36} color="#f0d399" />
              <View style={styles.badgeContainer}>
                <StyledText style={styles.badgeText}>1</StyledText>
              </View>
            </View>
            <View style={styles.textContainer}>
              <StyledText style={styles.title}>
                {t('home.getPremiumBox.title')}
              </StyledText>
              <StyledText style={styles.subtitle}>
                {t('home.getPremiumBox.subtitle')}
              </StyledText>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={28} color="#f0d399" />
        </BlurView>
      </PressableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 5,
  },
  button: {
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F0D399',
  },
  subtitle: {
    fontSize: 12,
    color: '#f0d399',
  },
});

export default GetPremium;
