import React, { useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeHeader } from '@/components/common/router/HomeHeader';
import { fetchQuestions } from '@/store/slices/questionSlice';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import { RootState, AppDispatch } from '@/store';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { QuestionItem } from '@/components/view/questions';
import { CategoryItem } from '@/components/view/categories/CategorieItem';
import { Question, Category } from '@/types/type';
import { StyledText } from '@/components/common/StyledText';
import GetPremium from '@/components/common/buttons/get-premium';
import { ITEMS_PER_PAGE } from '@/constants/AppConstants';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: questions,
    loading: questionsLoading,
    error: questionsError,
  } = useSelector((state: RootState) => state.questions);

  const {
    items: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchQuestions({ page: 1, limit: ITEMS_PER_PAGE }));
    dispatch(fetchCategories({ page: 1, limit: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const renderQuestion: ListRenderItem<Question> = useCallback(
    ({ item }) => <QuestionItem question={item} />,
    []
  );

  const renderCategory: ListRenderItem<Category> = useCallback(
    ({ item }) => <CategoryItem category={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: Question | Category) => item.id.toString(),
    []
  );

  const loadMoreQuestions = useCallback(() => {
    if (questions.length % ITEMS_PER_PAGE === 0) {
      const nextPage = Math.floor(questions.length / ITEMS_PER_PAGE) + 1;
      dispatch(fetchQuestions({ page: nextPage, limit: ITEMS_PER_PAGE }));
    }
  }, [questions.length, dispatch]);

  const loadMoreCategories = useCallback(() => {
    if (categories.length % ITEMS_PER_PAGE === 0) {
      const nextPage = Math.floor(categories.length / ITEMS_PER_PAGE) + 1;
      dispatch(fetchCategories({ page: nextPage, limit: ITEMS_PER_PAGE }));
    }
  }, [categories.length, dispatch]);

  const renderFooter = useCallback(() => {
    if (questionsLoading === 'pending' || categoriesLoading === 'pending') {
      return <ActivityIndicator size="small" color={Colors.primary} />;
    }
    return null;
  }, [questionsLoading, categoriesLoading]);

  const memoizedQuestionsList = useMemo(
    () => (
      <>
        <GetPremium />
        <StyledText style={styles.sectionHeader}>
          {t('home.questionHeader')}
        </StyledText>
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMoreQuestions}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          style={{
            padding: 6,
          }}
        />
      </>
    ),

    [
      questions,
      renderQuestion,
      keyExtractor,
      loadMoreQuestions,
      t,
      renderFooter,
    ]
  );

  const memoizedCategoriesList = useMemo(
    () => (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
        }}
      >
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={keyExtractor}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreCategories}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={memoizedQuestionsList}
          contentContainerStyle={{
            paddingTop: 15,
          }}
          ListFooterComponent={renderFooter}
        />
      </View>
    ),
    [
      categories,
      renderCategory,
      keyExtractor,
      loadMoreCategories,
      memoizedQuestionsList,
      renderFooter,
    ]
  );

  if (questionsLoading === 'pending' || categoriesLoading === 'pending') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (questionsError || categoriesError) {
    return <StyledText>Error: {questionsError || categoriesError}</StyledText>;
  }

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp}>
        <HomeHeader />
      </Animated.View>
      {memoizedCategoriesList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    marginLeft: 6,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default React.memo(HomeScreen);
