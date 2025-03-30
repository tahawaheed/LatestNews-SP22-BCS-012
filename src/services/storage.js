import AsyncStorage from '@react-native-async-storage/async-storage';

const ARTICLES_KEY = '@news_articles';

export const initStorage = async () => {
  try {
    const articles = await AsyncStorage.getItem(ARTICLES_KEY);
    if (!articles) {
      await AsyncStorage.setItem(ARTICLES_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

export const saveArticles = async (articles) => {
  try {
    await AsyncStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (error) {
    console.error('Error saving articles:', error);
  }
};

export const getStoredArticles = async () => {
  try {
    const articles = await AsyncStorage.getItem(ARTICLES_KEY);
    return articles ? JSON.parse(articles) : [];
  } catch (error) {
    console.error('Error getting articles:', error);
    return [];
  }
}; 