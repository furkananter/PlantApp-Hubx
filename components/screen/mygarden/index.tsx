import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MyGardenHeader } from '@/components/common/router/MyGardenHeader';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
export default function MyGardenScreenIOS() {
  const { t } = useTranslation();
  return (
    <>
      <MyGardenHeader />
      <View style={styles.content}>
        <PressableOpacity style={styles.leafButton}>
          <FontAwesome5
            name="canadian-maple-leaf"
            size={36}
            color={Colors.primary}
          />
        </PressableOpacity>
        <Text style={styles.noPlantTitle}>{t('myGarden.header.subtitle')}</Text>
        <Text style={styles.noPlantSubtitle}>
          {t('myGarden.header.add-plant')}
        </Text>
        <PressableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>
            {t('myGarden.header.add-plant-button')}
          </Text>
        </PressableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  noPlantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noPlantSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  leafButton: {
    backgroundColor: Colors.primaryOpacity,
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: Colors.primaryOpacity,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  addButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
