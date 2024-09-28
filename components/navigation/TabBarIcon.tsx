import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore
import HomeIconSvg from '@/assets/icons/home.svg';
// @ts-ignore
import MyGardenIconSvg from '@/assets/icons/mygarden.svg';
// @ts-ignore
import DiagnoseIconSvg from '@/assets/icons/diagnose.svg';
// @ts-ignore
import ProfileIconSvg from '@/assets/icons/profile.svg';
// @ts-ignore
import ScanIconSvg from '@/assets/icons/scan.svg';
import { IconProps } from '@/types/type';

export function HomeIcon({ size = 28, style, color, ...rest }: IconProps) {
  return (
    <HomeIconSvg
      width={size}
      height={size}
      fill={color}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}

export function MyGardenIcon({ size = 28, style, color, ...rest }: IconProps) {
  return (
    <MyGardenIconSvg
      width={size}
      height={size}
      fill={color}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}

export function ScanIcon({ size = 56, style, ...rest }: IconProps) {
  return (
    <View
      style={[
        Platform.OS === 'ios' ? styles.scanIconIOS : styles.scanIconAndroid,
        style,
      ]}
    >
      <LinearGradient
        colors={['#28AF6E', '#2CCC80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <ScanIconSvg width={size} height={size} fill={'#fff'} {...rest} />
      </LinearGradient>
    </View>
  );
}

export function DiagnoseIcon({ size = 28, style, color, ...rest }: IconProps) {
  return (
    <DiagnoseIconSvg
      width={size}
      height={size}
      fill={color}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}

export function ProfileIcon({ size = 28, style, color, ...rest }: IconProps) {
  return (
    <ProfileIconSvg
      width={size}
      height={size}
      fill={color}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  scanIconIOS: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: 'hidden',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#28AF6E',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  scanIconAndroid: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: '#28AF6E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 40,
    elevation: 5,
    borderWidth: 4,
    borderColor: 'rgba(40, 175, 110, 0.8)',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70 / 2,
  },
});
