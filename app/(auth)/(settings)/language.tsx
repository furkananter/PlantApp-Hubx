import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { languages } from '@/i18n/languages';

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { StyledText } from '@/components/common/StyledText';

const LanguageButton = ({
  item,
  isActive,
  onPress,
}: {
  item: { code: string; name: string; flag: string };
  isActive: boolean;
  onPress: () => void;
}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        styles.languageItem,
        isActive
          ? { backgroundColor: Colors.primaryOpacity }
          : { backgroundColor: Colors.backgroundSecondary },
      ]}
    >
      <Image
        source={{
          uri: `https://flagcdn.com/32x24/${item.flag.toLowerCase()}.png`,
        }}
        style={styles.flagImage}
        contentFit="contain"
      />
      <StyledText
        style={styles.languageName}
        type={isActive ? 'defaultSemiBold' : 'default'}
      >
        {item.name}
      </StyledText>
      {isActive && (
        <Ionicons
          name="checkmark"
          size={24}
          color={Colors.tint}
          style={styles.checkmark}
        />
      )}
    </PressableOpacity>
  );
};

const LanguageSettings = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={languages}
        renderItem={({ item }) => (
          <LanguageButton
            item={item}
            isActive={currentLanguage === item.code}
            onPress={() => changeLanguage(item.code)}
          />
        )}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.primaryOpacity,
  },

  flagImage: {
    width: 30,
    height: 20,
    marginRight: 16,
    borderRadius: 2,
  },
  languageName: {
    fontSize: 18,
    flex: 1,
  },
  checkmark: {
    marginLeft: 'auto',
  },
});

export default LanguageSettings;
