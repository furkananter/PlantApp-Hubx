import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { StyledText } from '@/components/common/StyledText';
import { Colors } from '@/constants/Colors';
import PressableOpacity from './buttons/PressableOpacity';

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isOpen ? animatedHeight.value : 0, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  return (
    <View>
      <PressableOpacity
        style={styles.heading}
        onPress={() => {
          setIsOpen((value) => !value);
          animatedHeight.value = isOpen ? 0 : 100;
        }}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={Colors.text}
        />
        <StyledText type="defaultSemiBold">{title}</StyledText>
      </PressableOpacity>
      <Animated.View style={[styles.content, animatedStyle]}>
        <ScrollView style={{ maxHeight: 100 }} nestedScrollEnabled={true}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    borderRadius: 12,
    maxHeight: 100,
  },
});
