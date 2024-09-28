import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import PressableOpacity from '../buttons/PressableOpacity';

const HeaderRight = () => {
  const router = useRouter();

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(settings)/settings');
  };

  return (
    <PressableOpacity onPress={handleSettings} style={styles.container}>
      <Ionicons name="settings-outline" size={24} color={Colors.text} />
    </PressableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export default HeaderRight;
