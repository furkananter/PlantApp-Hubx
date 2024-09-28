import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { useTranslation } from 'react-i18next';
import { StyledText } from '@/components/common/StyledText';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Constants from 'expo-constants';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
  id: number;
}

const MenuItemComponent: React.FC<MenuItem & { onPress: () => void }> = ({
  id,
  icon,
  text,
  onPress,
}) => (
  <PressableOpacity
    style={[
      styles.menuItem,
      {
        borderBottomWidth: id === 6 ? 0 : 1,
      },
    ]}
    onPress={onPress}
    key={id}
  >
    <Ionicons name={icon} size={24} color={Colors.text} />
    <StyledText style={styles.menuItemText}>{text}</StyledText>
    <Ionicons name="chevron-forward" size={24} color={Colors.text} />
  </PressableOpacity>
);

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = useCallback(
    (route: Href) => {
      Haptics.selectionAsync();
      router.push(route);
    },
    [router]
  );

  const menuItems: MenuItem[] = [
    {
      id: 1,
      icon: 'language-outline',
      text: t('profile.profile-buttons.language'),

      onPress: () => handlePress('/(settings)/language'),
    },
    {
      id: 2,
      icon: 'card-outline',
      text: t('profile.profile-buttons.payment'),

      onPress: () => handlePress('/(tabs)/profile'),
    },
    {
      id: 3,
      icon: 'notifications-outline',
      text: t('profile.profile-buttons.notifications'),

      onPress: () => handlePress('/(tabs)/profile'),
    },
    {
      id: 4,
      icon: 'settings-outline',
      text: t('profile.profile-buttons.settings'),

      onPress: () => handlePress('/(settings)/settings'),
    },

    {
      id: 5,
      icon: 'log-out-outline',
      text: t('profile.profile-buttons.delete'),

      onPress: () => handlePress('/'),
    },
    {
      id: 6,
      icon: 'help-circle-outline',
      text: t('profile.profile-buttons.help'),
      onPress: () => handlePress('/(settings)/help'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BMTg1MTkxODgzMF5BMl5BanBnXkFtZTgwMjExMjgyNzM@._V1_UX266.jpg',
            }}
            style={styles.avatar}
          />
          <StyledText style={styles.name} type="title">
            Sheldon Cooper
          </StyledText>
          <StyledText style={styles.username} type="default">
            @{'sheldon'}
          </StyledText>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.duration(index * 200)}
            >
              <MenuItemComponent
                id={item.id}
                icon={item.icon}
                text={item.text}
                onPress={item.onPress}
              />
            </Animated.View>
          ))}
        </View>
        <StyledText style={styles.version}>
          {t('version', { version: Constants.expoVersion })}
        </StyledText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  menuContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: Colors.borderColor,
    marginBottom: 20,
    backgroundColor: Colors.backgroundSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});

export default ProfileScreen;
