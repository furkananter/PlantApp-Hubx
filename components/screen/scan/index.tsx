import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Btn from '@/components/common/buttons/Btn';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { useRouter } from 'expo-router';
import { ScreenHeight } from '@/constants/AppConstants';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

const THRESHOLD = 120;
const MAX_SLIDE = 150;

const ScanScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const hasReachedThreshold = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
      hasReachedThreshold.value = false;
    })
    .onUpdate((event) => {
      const newTranslateY = event.translationY + context.value.y;
      translateY.value = interpolate(
        newTranslateY,
        [0, MAX_SLIDE],
        [0, MAX_SLIDE],
        Extrapolation.CLAMP
      );

      if (newTranslateY >= THRESHOLD && !hasReachedThreshold.value) {
        hasReachedThreshold.value = true;
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
      } else if (newTranslateY < THRESHOLD && hasReachedThreshold.value) {
        hasReachedThreshold.value = false;
      }
    })
    .onEnd(() => {
      if (translateY.value > THRESHOLD) {
        runOnJS(router.back)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, THRESHOLD],
      [1, 0.95],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }, { scale }],
    };
  });

  const btnStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, THRESHOLD],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  if (!permission) {
    return (
      <SafeAreaView
        style={styles.permissionContainer}
        edges={['bottom', 'top']}
      >
        <Text style={styles.messages}>
          {t('scan.camera-permission-message')}
        </Text>
        <Btn
          onPress={() => requestPermission()}
          iconColor="white"
          style={styles.btn}
          icon={<Ionicons name="camera" size={24} color={Colors.background} />}
          color={Colors.primary}
          textStyle={{
            color: 'white',
          }}
        >
          {t('scan.permission-btn')}
        </Btn>
        <Btn
          onPress={() => router.back()}
          color="red"
          style={styles.btn}
          textStyle={{
            color: 'white',
          }}
          icon={<Ionicons name="close" size={24} color="white" />}
        >
          {t('cancel')}
        </Btn>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.camera, rStyle]}>
          <CameraView style={StyleSheet.absoluteFill} facing={facing}>
            <View style={styles.overlay}>
              <Animated.View style={[styles.header, btnStyle]}>
                <PressableOpacity onPress={() => router.back()}>
                  <Ionicons name="close" size={28} color="white" />
                </PressableOpacity>

                <PressableOpacity>
                  <Ionicons name="flash-off" size={28} color="white" />
                </PressableOpacity>
              </Animated.View>

              <Animated.View style={[styles.footer, btnStyle]}>
                <PressableOpacity
                  style={styles.imageButton}
                  onPress={() => {
                    router.push({
                      pathname: '/(auth)/(modal)/gallery',
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: 'https://picsum.photos/id/15/200/200',
                    }}
                    style={styles.imagePlaceholder}
                    contentFit="contain"
                  />
                </PressableOpacity>
                <PressableOpacity style={styles.captureButton}>
                  <View style={styles.captureButtonInner} />
                </PressableOpacity>
                <PressableOpacity onPress={toggleCameraFacing}>
                  <Ionicons
                    name="camera-reverse-outline"
                    size={36}
                    color="white"
                  />
                </PressableOpacity>
              </Animated.View>
            </View>
          </CameraView>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginHorizontal: 20,
    marginVertical: 5,
    width: '90%',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  camera: {
    flex: 1,
    height: ScreenHeight,
    borderRadius: 30,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  messages: {
    fontSize: 16,
    fontWeight: '300',
    margin: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
  },
  imageButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default ScanScreen;
