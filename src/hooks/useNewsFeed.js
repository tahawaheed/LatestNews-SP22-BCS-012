import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { fetchNews } from '../services/newsApi';
import { initStorage, saveArticles, getStoredArticles } from '../services/storage';

export const useNewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    initStorage().then(() => {
      loadInitialData();
    });
  }, []);

  const loadInitialData = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      
      if (netInfo.isConnected) {
        await loadOnlineData();
      } else {
        await loadOfflineData();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loadOnlineData = async () => {
    try {
      const response = await fetchNews(1);
      const newArticles = response.articles;
      
      setArticles(newArticles);
      setHasMore(newArticles.length === 20);
      await saveArticles(newArticles);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadOfflineData = async () => {
    try {
      const storedArticles = await getStoredArticles();
      setArticles(storedArticles);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      const nextPage = page + 1;
      const response = await fetchNews(nextPage);
      const newArticles = response.articles;

      setArticles(prev => [...prev, ...newArticles]);
      setPage(nextPage);
      setHasMore(newArticles.length === 20);
      await saveArticles([...articles, ...newArticles]);
    } catch (err) {
      setError(err.message);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    setPage(1);
    try {
      await loadOnlineData();
    } finally {
      setRefreshing(false);
    }
  };

  return {
    articles,
    loading,
    error,
    hasMore,
    refreshing,
    loadMore,
    refresh,
  };
}; 