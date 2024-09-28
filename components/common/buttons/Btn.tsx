import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { StyledText } from '@/components/common/StyledText';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
}

const Btn: React.FC<ButtonProps> = ({
  onPress,
  style,
  textStyle,
  color,
  disabled = false,
  loading = false,
  children,
  icon,
  iconPosition = 'left',
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator animating={true} color={Colors.text} size="small" />
      );
    }

    const iconElement = icon ? (
      <View style={styles.iconContainer}>{icon}</View>
    ) : null;

    return (
      <>
        {iconPosition === 'left' && iconElement}
        <StyledText style={[styles.buttonText, textStyle]}>
          {children}
        </StyledText>
        {iconPosition === 'right' && iconElement}
      </>
    );
  };

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') {
          Haptics.selectionAsync();
        }
        onPress();
      }}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color || Colors.button },
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {renderContent()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginHorizontal: 5,
  },
});

export default Btn;
