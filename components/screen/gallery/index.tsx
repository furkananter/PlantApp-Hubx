import React, { useState, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { useNavigation, useRouter } from 'expo-router';
import { ScreenHeight, ScreenWidth } from '@/constants/AppConstants';
import { Colors } from '@/constants/Colors';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

type ImageItem = {
  id: string;
  uri: string;
};

const imageData: ImageItem[] = [
  { id: '1', uri: 'https://picsum.photos/id/1/200/200' },
  { id: '2', uri: 'https://picsum.photos/id/2/200/200' },
  { id: '3', uri: 'https://picsum.photos/id/3/200/200' },
  { id: '4', uri: 'https://picsum.photos/id/4/200/200' },
  { id: '5', uri: 'https://picsum.photos/id/5/200/200' },
  { id: '6', uri: 'https://picsum.photos/id/6/200/200' },
  { id: '7', uri: 'https://picsum.photos/id/7/200/200' },
  { id: '8', uri: 'https://picsum.photos/id/8/200/200' },
  { id: '9', uri: 'https://picsum.photos/id/9/200/200' },
  { id: '10', uri: 'https://picsum.photos/id/10/200/200' },
  { id: '11', uri: 'https://picsum.photos/id/11/200/200' },
  { id: '12', uri: 'https://picsum.photos/id/12/200/200' },
  { id: '13', uri: 'https://picsum.photos/id/13/200/200' },
  { id: '14', uri: 'https://picsum.photos/id/14/200/200' },
  { id: '15', uri: 'https://picsum.photos/id/15/200/200' },
];

// Bileşenler
const ImageCard: React.FC<{
  item: ImageItem;
  onPress: () => void;
}> = ({ item, onPress }) => (
  // Inside high perfomance needed Apps, I think you should ignore entering animation
  // It probably will cause performance issues
  // Use gallery with Skeleton instead of this
  <Animated.View entering={FadeIn.delay(100 * Number(item.id))}>
    <PressableOpacity onPress={onPress}>
      <View style={styles.gridItem}>
        <Image source={{ uri: item.uri }} style={styles.gridImage} />
      </View>
    </PressableOpacity>
  </Animated.View>
);

const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => {
        if (selectedImage) {
          return (
            <PressableOpacity onPress={() => setSelectedImage(null)}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </PressableOpacity>
          );
        } else {
          return (
            <PressableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="black" />
            </PressableOpacity>
          );
        }
      },
    });
  }, [navigation, selectedImage]);

  const handleUseImage = (image: ImageItem) => {
    setSelectedImage(null);
    router.back();
    router.navigate('/diagnose');
  };

  const renderItem: ListRenderItem<ImageItem> = useCallback(
    ({ item }) => (
      <ImageCard item={item} onPress={() => setSelectedImage(item)} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        key={'grid'}
        contentContainerStyle={styles.imageGrid}
      />
      {selectedImage && (
        <Animated.View
          style={styles.imageDetailOverlay}
          entering={FadeInDown.duration(400)}
          exiting={FadeOutDown.duration(400)}
        >
          <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />
          <PressableOpacity
            style={styles.useButton}
            onPress={() => handleUseImage(selectedImage)}
          >
            <MaterialCommunityIcons name="flower" size={24} color="white" />
            <Text style={styles.useButtonText}>{t('scan.scan-this')}</Text>
          </PressableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const imageAspectRatio = 16 / 9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageGrid: {
    padding: 2,
  },
  gridItem: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    margin: 2,
    width: ScreenWidth / 3 - 5,
    height: (ScreenWidth / 3 - 5) * imageAspectRatio,
  },
  listItem: {
    marginBottom: 10,
  },
  gridImage: {
    width: ScreenWidth / 3 - 5,
    height: (ScreenWidth / 3 - 5) * imageAspectRatio,
  },

  imageDetailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: ScreenWidth,
    height: ScreenHeight,
    resizeMode: 'contain',
  },
  useButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
  },
  useButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Gallery;
