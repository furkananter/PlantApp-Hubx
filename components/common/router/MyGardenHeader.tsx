import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StyledText } from '@/components/common/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import SegmentedControl from '@/components/common/buttons/SegmentedControl';
import { useTranslation } from 'react-i18next';

export const MyGardenHeader: React.FC = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          borderBottomColor: Colors.borderColor,
        },
      ]}
      edges={['top']}
    >
      <View style={styles.header}>
        <StyledText style={styles.greeting} type="subtitle">
          {t('myGarden.header.subtitle')}
        </StyledText>
        <StyledText style={styles.title} type="title">
          {t('myGarden.header.title')}
        </StyledText>
        <SegmentedControl
          options={[
            { value: 1, label: t('myGarden.segmentedControl.allPlants') },
            { value: 2, label: t('myGarden.segmentedControl.reminders') },
          ]}
          selectedValue={selectedIndex}
          onValueChange={(value: number) => setSelectedIndex(value)}
        />
      </View>

      <Image
        source={require('@/assets/images/header/home-header-left.png')}
        style={styles.leftImage}
        contentFit="contain"
      />

      <Image
        source={require('@/assets/images/header/home-header-right.png')}
        style={styles.rightImage}
        contentFit="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.background,
  },
  header: {
    zIndex: 1,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  leftImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -15,
    left: 0,
    zIndex: -1,
  },
  rightImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -12,
    right: 0,
    zIndex: -1,
  },
});
