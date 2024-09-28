import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { StyledText } from '@/components/common/StyledText';

interface RadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
  value?: string;
  description?: string;
  color?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onSelect,
  label,
  value,
  description,
  color,
}) => {
  const scale = useSharedValue<number>(1);
  const checkScale = useSharedValue<number>(0);
  const checkOpacity = useSharedValue<number>(0);

  useEffect(() => {
    if (selected) {
      scale.value = withSpring(1.1, { damping: 20, stiffness: 100 }, () => {
        scale.value = withSpring(1, { damping: 20, stiffness: 100 });
      });
      checkScale.value = withTiming(1, { duration: 400 });
      checkOpacity.value = withTiming(1, { duration: 400 });
    } else {
      checkScale.value = withTiming(0, { duration: 400 });
      checkOpacity.value = withTiming(0, { duration: 400 });
    }
  }, [selected, scale, checkScale, checkOpacity]);

  const animatedRadioStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: selected ? color || Colors.primary : 'transparent',
        },
      ]}
      onPress={onSelect}
    >
      <Animated.View
        style={[
          styles.radioOuter,
          animatedRadioStyle,
          { borderColor: color || Colors.primary },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.radioInner,
              { backgroundColor: color || Colors.primary },
            ]}
          />
        )}
      </Animated.View>
      <View style={styles.textContainer}>
        <StyledText style={styles.label}>{label}</StyledText>
        {value && <StyledText style={styles.value}>{value}</StyledText>}
        {description && (
          <StyledText style={styles.description}>{description}</StyledText>
        )}
      </View>
      {selected && (
        <Animated.View style={[styles.checkIcon, animatedCheckStyle]}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={color || Colors.primary}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,

    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,

    marginTop: 2,
  },
  description: {
    fontSize: 12,

    marginTop: 2,
  },
  checkIcon: {
    marginLeft: 8,
  },
});

export default RadioButton;
