import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import PressableOpacity from '../buttons/PressableOpacity';

const HeaderLeft = () => {
  const router = useRouter();

  const handleBack = () => {
    Haptics.selectionAsync();
    router.back();
  };

  return (
    <PressableOpacity onPress={handleBack}>
      <Ionicons name="chevron-back" size={24} color={Colors.text} />
    </PressableOpacity>
  );
};

export default HeaderLeft;
