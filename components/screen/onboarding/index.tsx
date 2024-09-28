import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import PagerView from 'react-native-pager-view';
import Step1 from '@/components/view/onboarding/step1';
import Step2 from '@/components/view/onboarding/step2';
import { StyledText } from '@/components/common/StyledText';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { ScreenWidth } from '@/constants/AppConstants';
import { useTranslation } from 'react-i18next';

const AnimatedDot: React.FC<{ active: boolean }> = ({ active }) => {
  const activeValue = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    activeValue.value = withTiming(active ? 1 : 0, { duration: 300 });
  }, [active, activeValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolateColor(activeValue.value, [0, 1], [8, 10]),
      height: interpolateColor(activeValue.value, [0, 1], [8, 10]),
      backgroundColor: interpolateColor(
        activeValue.value,
        [0, 1],
        [Colors.button, Colors.text]
      ),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const OnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const pagerRef = useRef<PagerView>(null);

  const handlePageChange = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  const handleContinue = () => {
    if (currentIndex < 1) {
      pagerRef.current?.setPage(currentIndex + 1);
    } else {
      router.replace('/paywall');
    }
  };

  const pages = [
    { key: '1', component: Step1 },
    { key: '2', component: Step2 },
    // We need to add a step here
    // We will not use this step but it is required for Pagination Dots
    { key: '3', component: View },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={currentIndex}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        {pages.map(({ key, component: Component }) => (
          <View key={key} style={styles.pageContainer}>
            <Component />
          </View>
        ))}
      </PagerView>
      <View style={styles.bottomContainer}>
        <PressableOpacity style={styles.button} onPress={handleContinue}>
          <StyledText type="subtitle" style={styles.buttonText}>
            {t('onboarding.continue')}
          </StyledText>
        </PressableOpacity>
        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <AnimatedDot key={index} active={currentIndex === index} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    width: ScreenWidth,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 4,
    borderRadius: 10,
  },
});

export default OnboardingScreen;
