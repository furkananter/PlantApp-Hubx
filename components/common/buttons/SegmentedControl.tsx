// components/common/buttons/SegmentedControl.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, LayoutRectangle } from 'react-native';
import PressableOpacity from './PressableOpacity';
import { Colors } from '@/constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface Option {
  value: number;
  label: string;
}

interface SegmentedButtonProps {
  options: Option[];
  selectedValue: number;
  onValueChange: (value: number) => void;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);
  const buttonWidth = useSharedValue(0);

  useEffect(() => {
    if (containerWidth > 0) {
      buttonWidth.value = containerWidth / options.length;
      translateX.value = withSpring(buttonWidth.value * (selectedValue - 1), {
        stiffness: 1000,
        damping: 100,
        mass: 1,
      });
    }
  }, [selectedValue, containerWidth, options.length]);

  const handlePress = (value: number) => {
    runOnJS(onValueChange)(value);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: buttonWidth.value,
  }));

  const onLayout = (event: { nativeEvent: { layout: LayoutRectangle } }) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={styles.segmentedButtonContainer} onLayout={onLayout}>
      <Animated.View style={[styles.animatedBackground, animatedStyle]} />
      {options.map((option, index) => (
        <PressableOpacity
          key={option.value}
          style={[
            styles.segmentedButton,
            { width: `${100 / options.length}%` },
          ]}
          onPress={() => handlePress(index + 1)}
        >
          <Text
            style={[
              styles.segmentedButtonText,
              selectedValue === index + 1 && styles.segmentedButtonTextSelected,
            ]}
          >
            {option.label}
          </Text>
        </PressableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedButtonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.button,
    borderRadius: 12,
    marginBottom: 12,
    padding: 3,
    position: 'relative',
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    borderRadius: 12,
    zIndex: 0,
  },
  segmentedButton: {
    paddingVertical: 8,
    // paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentedButtonText: {
    color: '#666',
  },
  segmentedButtonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SegmentedButton;
