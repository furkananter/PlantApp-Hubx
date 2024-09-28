import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from '@/components/common/buttons/PressableOpacity';
import { Image } from 'expo-image';
import { CategoryItemProps } from '@/types/type';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { StyledText } from '../../common/StyledText';
import { formatCategoryName } from '@/helpers/app-functions';

export const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({ category }) => {
    const formattedName = useMemo(
      () => formatCategoryName(category.name),
      [category.name]
    );

    return (
      <Animated.View
        entering={FadeInUp.duration(category.id * 100)}
        style={[
          styles.categoryCard,
          {
            backgroundColor: Colors.background,
            borderColor: Colors.borderColor,
          },
        ]}
      >
        <PressableOpacity>
          <Image
            source={{ uri: category?.image?.url }}
            style={styles.categoryImage}
          />
          <View style={styles.categoryTitleContainer}>
            {formattedName.map((line, index) => (
              <StyledText key={index} style={styles.categoryName}>
                {line}
              </StyledText>
            ))}
          </View>
        </PressableOpacity>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    margin: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F4F6F6',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitleContainer: {
    position: 'absolute',
    left: 10,
    padding: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
