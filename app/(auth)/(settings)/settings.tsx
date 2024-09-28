import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Href, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { StyledText } from '@/components/common/StyledText';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser());
    router.replace('/(no-auth)/onboarding');
  };

  const settings: {
    icon: string;
    title: string;
    onPress?: () => void;
    route?: Href;
  }[] = [
    {
      icon: 'language',
      title: t('profile.profile-buttons.language'),
      route: '/(settings)/language',
    },
    {
      icon: 'help-circle',
      title: t('profile.profile-buttons.help'),
      route: '/(settings)/help',
    },
    {
      icon: 'sunny',
      title: t('profile.profile-buttons.theme'),
      onPress: () => {},
    },
  ];

  const SettingItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: string;
    title: string;
    onPress: () => void;
  }) => (
    <PressableOpacity
      style={[
        styles.settingItem,
        {
          backgroundColor: Colors.background,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={24}
        color={Colors.text}
        style={styles.icon}
      />
      <StyledText style={styles.settingText}>{title}</StyledText>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.text}
        style={styles.chevron}
      />
    </PressableOpacity>
  );

  const SettingGroup = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.settingGroup}>{children}</View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.backgroundSecondary },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <SettingGroup>
          {settings.map((setting, index) => (
            <React.Fragment key={setting.title}>
              <SettingItem
                icon={setting.icon}
                title={setting.title}
                onPress={
                  setting.onPress
                    ? setting.onPress
                    : () => router.push(setting.route as Href)
                }
              />
              {index < settings.length - 1 && (
                <View
                  style={[
                    styles.separator,
                    { backgroundColor: Colors.borderColor },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </SettingGroup>

        <SettingGroup>
          <SettingItem
            icon="log-out"
            title={t('profile.profile-buttons.logout')}
            onPress={handleLogout}
          />
          <View style={styles.separator} />
          <SettingItem
            icon="trash"
            title={t('profile.profile-buttons.delete')}
            onPress={() => {}}
          />
        </SettingGroup>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingGroup: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 20,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
  },
  chevron: {
    opacity: 0.6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 64,
  },
});

export default SettingsScreen;
