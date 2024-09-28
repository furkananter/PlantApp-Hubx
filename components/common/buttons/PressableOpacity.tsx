import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

const PressableOpacity = ({ style, ...props }: PressableProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        style as StyleProp<ViewStyle>,
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      {props.children}
    </Pressable>
  );
};

export default PressableOpacity;
