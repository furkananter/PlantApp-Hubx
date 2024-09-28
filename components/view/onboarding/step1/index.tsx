import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyledText } from '@/components/common/StyledText';
import { ScreenHeight, ScreenWidth } from '@/constants/AppConstants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';

const IdentifyWithBrush: React.FC = () => {
  return (
    <View style={styles.identifyContainer}>
      <Image
        source={require('@/assets/images/onboarding/brush.png')}
        style={styles.brushImage}
        contentFit="contain"
      />
    </View>
  );
};

const Step1: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
          }}
        >
          <StyledText color="#13231B" style={styles.title}>
            {t('onboarding.step1.title')}
            <StyledText color="#13231B" style={styles.identifyBoldText}>
              {t('onboarding.step1.highlight')}
            </StyledText>
            <IdentifyWithBrush />
            {'\n'}
            {t('onboarding.step1.title-continue')}
          </StyledText>
        </View>
      </View>
      <Animated.View
        style={styles.imageContainer}
        entering={FadeInDown.duration(1000).delay(300)}
      >
        <Image
          source={require('@/assets/images/onboarding/onboarding1.png')}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 20,
    paddingLeft: 30,
  },
  title: {
    color: '#13231B',
    fontSize: 28,
    fontWeight: '500',
  },
  identifyText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#13231B',
  },
  identifyBoldText: {
    fontWeight: '900',
    fontSize: 28,
  },
  brushImage: {
    position: 'absolute',
    bottom: 20,
    left: -120,
    top: 5,
    zIndex: -1,
    width: 150,
    height: 30,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ScreenWidth,
    height: ScreenHeight * 0.9,
    aspectRatio: 1,
    alignItems: 'center',
  },
  identifyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});

export default Step1;
