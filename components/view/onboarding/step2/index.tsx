import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { StyledText } from '@/components/common/StyledText';
import { ScreenHeight, ScreenWidth } from '@/constants/AppConstants';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const IdentifyWithBrush: React.FC = () => {
  return (
    <View>
      <Image
        source={require('@/assets/images/onboarding/brush2.png')}
        style={styles.brushImage}
        contentFit="contain"
      />
    </View>
  );
};

const Step2: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <AnimatedImageBackground
        source={require('@/assets/images/onboarding/leaf.png')}
        style={styles.backgroundImage}
        blurRadius={30}
        entering={FadeInUp.duration(700).delay(1000)}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <StyledText style={styles.title}>
              {t('onboarding.step2.title')}
              <StyledText style={styles.boldTitleText}>
                {t('onboarding.step2.highlight')}
              </StyledText>
            </StyledText>
            <IdentifyWithBrush />
          </View>

          <View style={styles.imageContainer}>
            <View>
              <Animated.View entering={FadeInUp.duration(600)}>
                <Image
                  source={require('@/assets/images/onboarding/iphone.png')}
                  style={styles.phoneImage}
                  contentFit="contain"
                />
              </Animated.View>
            </View>
            <Animated.View
              entering={FadeInUp.duration(700)}
              style={styles.plantImage}
            >
              <Image
                source={require('@/assets/images/onboarding/artwork.png')}
                style={styles.plantImage}
                contentFit="contain"
              />
            </Animated.View>
          </View>
        </View>
      </View>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
        style={styles.overlay}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -999,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    top: '60%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 20,
    paddingLeft: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
  },
  boldTitleText: {
    fontWeight: '900',
    fontSize: 28,
  },
  brushImage: {
    left: 110,
    bottom: -25,
    zIndex: 1,
    position: 'absolute',
    aspectRatio: 1,
    resizeMode: 'contain',
    width: 180,
    height: 30,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneImage: {
    width: ScreenWidth * 0.7,
    height: ScreenHeight,
  },

  plantImage: {
    position: 'absolute',
    top: 10,
    width: 150,
    height: 150,
    right: 15,
  },
});

export default Step2;
