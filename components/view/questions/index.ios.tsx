import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { StyledText } from '../../common/StyledText';
import { QuestionItemProps } from '@/types/type';

export const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  return (
    <Animated.View
      style={styles.questionCard}
      entering={FadeInUp.duration(question.id * 200)}
    >
      <ImageBackground
        source={{ uri: question.image_uri }}
        style={styles.questionBackground}
        imageStyle={styles.questionBackgroundImage}
        resizeMode="cover"
      >
        <BlurView
          style={styles.questionTitleContainer}
          intensity={80}
          tint="dark"
        >
          <Animated.View
            entering={FadeInUp.duration(600).delay(question.id * 200)}
          >
            <StyledText style={styles.questionTitle}>
              {question.title}
            </StyledText>
          </Animated.View>
        </BlurView>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    width: 300,
    height: 180,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 8,
  },
  questionBackground: {
    flex: 1,
  },
  questionBackgroundImage: {
    borderRadius: 8,
  },
  questionTitleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
  },
  questionTitle: {
    color: '#fff',

    fontSize: 16,
    textTransform: 'capitalize',
    paddingHorizontal: 20,
  },
});
