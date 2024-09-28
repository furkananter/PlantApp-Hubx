import { Text, type TextProps, StyleSheet } from 'react-native';

export type StyledTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  color?: string;
};

export function StyledText({
  style,
  color = '#000',
  type = 'default',
  ...rest
}: StyledTextProps) {
  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
  },
  defaultSemiBold: {
    fontSize: 15,
    lineHeight: 24,
  },
  title: {
    fontSize: 33,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
