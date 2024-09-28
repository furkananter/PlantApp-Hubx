import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { StyledText } from '@/components/common/StyledText';
import { Image } from 'expo-image';
import { ScreenHeight, ScreenWidth } from '@/constants/AppConstants';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { t } from 'i18next';

// Normally prices come from backend or RevenueCat etc. This is just a mock

const PaywallScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedSubscription, setSelectedSubscription] = useState(2);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableOpacity
          onPress={() => router.replace('/(auth)/(tabs)/home')}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={20} color="white" />
        </PressableOpacity>
      ),
    });
  }, [navigation, router]);

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['transparent', '#101E17']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <ImageBackground
        source={require('@/assets/images/cards/card1.png')}
        style={styles.background}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          <StyledText type="title" style={styles.title}>
            {t('paywall.title-highlight')}
            <StyledText type="title" style={styles.premiumText}>
              {t('paywall.premium')}
            </StyledText>
          </StyledText>
          <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginVertical: 15,
            }}
          >
            {renderFeature(
              t('paywall.cards.1.title'),
              t('paywall.cards.1.description'),
              'scan'
            )}

            {renderFeature(
              t('paywall.cards.2.title'),
              t('paywall.cards.2.description'),
              'speedometer-outline'
            )}

            {renderFeature(
              t('paywall.cards.3.title'),
              t('paywall.cards.3.description'),
              'leaf-outline'
            )}
          </ScrollView>

          {renderSubscriptionOption(
            t('paywall.pricing.1-month.title'),
            t('paywall.pricing.1-month.subtitle', { price: 2.99 }),
            selectedSubscription === 1,
            () => setSelectedSubscription(1)
          )}
          {renderSubscriptionOption(
            t('paywall.pricing.1-year.title'),
            t('paywall.pricing.1-year.subtitle', { price: 529.99 }),
            selectedSubscription === 2,
            () => setSelectedSubscription(2)
          )}

          <PressableOpacity
            style={styles.tryButton}
            onPress={() => router.replace('/(auth)/(tabs)/home')}
          >
            <Text style={styles.tryButtonText}>
              {t('paywall.subscribe-button')}
            </Text>
          </PressableOpacity>

          <StyledText style={styles.termsText}>{t('paywall.info')}</StyledText>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t('paywall.terms-button')} • {t('paywall.privacy-button')} •{' '}
              {t('paywall.restore-button')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const renderFeature = (title: string, subtitle: string, iconName: string) => (
  <View style={styles.featureBox}>
    <View style={styles.featureIconContainer}>
      <Ionicons
        name={iconName as keyof typeof Ionicons.glyphMap}
        size={24}
        color="white"
      />
    </View>
    <View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const renderSubscriptionOption = (
  title: string,
  description: string,
  isSelected: boolean,
  onSelect: () => void
) => (
  <PressableOpacity onPress={onSelect}>
    <LinearGradient
      colors={
        isSelected ? ['#28AF6E2B', '#28AF6E00'] : ['#FFFFFF0A', '#FFFFFF1A']
      }
      start={{ x: 1.2, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={[styles.subscriptionOption, isSelected && styles.selectedOption]}
    >
      <View
        style={[styles.radioButton, isSelected && styles.radioButtonActive]}
      >
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
      {isSelected && (
        <View style={styles.saveTag}>
          <Text style={styles.saveTagText}>
            {t('paywall.save', { discount: 50 })}
          </Text>
        </View>
      )}
    </LinearGradient>
  </PressableOpacity>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: ScreenWidth,

    zIndex: -1,
    height: ScreenHeight,
  },
  container: {
    // flex: 1,
    // backgroundColor: '#101E17',
    paddingBottom: 20,
  },
  content: {
    // flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 2,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  premiumText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 17,
    color: '#FFFFFFB2',
  },
  scrollViewContainer: {
    marginTop: 20,
    width: '100%',
    height: 150,
  },
  featureBox: {
    borderRadius: 14,
    padding: 16,
    width: 200,
    height: 130,
    marginRight: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF1A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
  },
  featureSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
  },
  subscriptionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF4D',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  radioButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#FFFFFF26',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: Colors.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: 'white',
    fontSize: 16,
  },
  optionDescription: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  saveTag: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  saveTagText: {
    color: 'white',
    fontSize: 12,
  },
  tryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 56,
  },
  tryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  termsText: {
    color: '#FFFFFF85',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF80',
    fontSize: 12,
  },
});

export default PaywallScreen;
