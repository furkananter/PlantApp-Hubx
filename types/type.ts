import { StyleProp, ViewStyle } from 'react-native';

export type IconProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rank: number;
  image: {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: string | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  order: number;
}

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export interface CategoryItemProps {
  category: Category;
}

export interface QuestionItemProps {
  question: Question;
}

export interface CategoriesState {
  items: Category[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
}

export interface QuestionsState {
  items: Question[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  hasMore: boolean;
}

export interface SearchState {
  query: string;
  results: string[];
  isFocused: boolean;
}
export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}
