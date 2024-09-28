import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { useRouter } from 'expo-router';
import { DiagnoseHeader } from '@/components/common/router/DiagnoseHeader';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';

const cardImages: { [key: string]: ImageSourcePropType } = {
  card1: require('@/assets/images/cards/card1.png'),
  card2: require('@/assets/images/cards/card2.png'),
  card3: require('@/assets/images/cards/card3.png'),
};

const DiagnoseScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <DiagnoseHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Animated.View entering={FadeInUp.duration(500).delay(500)}>
          <PressableOpacity
            onPress={() => router.push('/(modal)/scan')}
            style={styles.startDiagnosisCard}
          >
            <MaterialCommunityIcons name="leaf" size={40} color="#4CAF50" />
            <Text style={styles.startDiagnosisTitle}>
              {t('diagnose.startDiagnosis.title')}
            </Text>
            <Text style={styles.startDiagnosisSubtitle}>
              {t('diagnose.startDiagnosis.subtitle')}
            </Text>
            <PressableOpacity
              onPress={() => router.push('/(modal)/scan')}
              style={styles.takePhotoButton}
            >
              <Text style={styles.takePhotoText}>
                {t('diagnose.take-a-photo')}
              </Text>
            </PressableOpacity>
          </PressableOpacity>
        </Animated.View>

        <View style={styles.commonProblemsSection}>
          <Text style={styles.sectionTitle}>
            {t('diagnose.commonProblems.title')}
          </Text>
          <Text style={styles.seeMoreText}>
            {t('diagnose.commonProblems.seeMore')}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['card1', 'card2', 'card3'].map((card, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.duration(300).delay(300 + index * 100)}
              style={[styles.problemCard]}
            >
              <ImageBackground
                source={cardImages[card]}
                style={styles.cardImage}
              >
                <BlurView intensity={50} style={styles.blurView} tint="dark">
                  <Text style={styles.cardTitle}>{getCardTitle(card)}</Text>
                  <Text style={styles.cardSubtitle} numberOfLines={1}>
                    {getCardSubtitle(card)}
                  </Text>
                </BlurView>
              </ImageBackground>
            </Animated.View>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const getCardTitle = (card: string) => {
  switch (card) {
    case 'card1':
      return 'Abiotic Disease';
    case 'card2':
      return 'Acari';
    case 'card3':
      return 'Bacterial Disease';
    default:
      return '';
  }
};

const getCardSubtitle = (card: string) => {
  switch (card) {
    case 'card1':
      return 'Diseases caused by nonliving factors';
    case 'card2':
      return 'Pests';
    case 'card3':
      return 'Diseases caused by bacteria';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  startDiagnosisCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#00000033',
    shadowColor: '#00000033',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderStyle: 'dashed',
    backgroundColor: Colors.background,
  },
  startDiagnosisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  startDiagnosisSubtitle: {
    color: 'gray',
    marginTop: 8,
    marginBottom: 16,
  },
  commonProblemsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  problemCard: {
    backgroundColor: Colors.backgroundSecondary,
    overflow: 'hidden',
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    width: 250,
    height: 180,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  takePhotoButton: {
    backgroundColor: Colors.primaryOpacity,
    padding: 10,
    borderRadius: 15,
    marginTop: 16,
  },
  takePhotoText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default DiagnoseScreen;
