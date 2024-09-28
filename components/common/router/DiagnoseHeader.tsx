import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StyledText } from '@/components/common/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import PressableOpacity from '../buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

export const DiagnoseHeader: React.FC = () => {
  const { t } = useTranslation();

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
          {t('diagnose.header.subtitle')}
        </StyledText>
        <StyledText style={styles.title} type="title">
          {t('diagnose.header.title')}
        </StyledText>
        <PressableOpacity
          style={[
            styles.searchContainer,
            {
              backgroundColor: Colors.background,
            },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.placeholderColor}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: Colors.text,
              },
            ]}
            placeholder={t('diagnose.header.search-placeholder')}
            placeholderTextColor={Colors.placeholderColor}
            selectionColor={Colors.primary}
            cursorColor={Colors.primary}
          />
        </PressableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
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
