import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View, Text } from 'react-native';
import NewsList from '../components/NewsList';
import { useNewsFeed } from '../hooks/useNewsFeed';
import { theme } from '../utils/theme';

const HomeScreen = ({ navigation }) => {
  const {
    articles,
    loading,
    error,
    hasMore,
    refreshing,
    loadMore,
    refresh,
  } = useNewsFeed();

  const handleNewsPress = (article) => {
    navigation.navigate('NewsDetail', { article });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Latest News</Text>
      </View>
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        hasMore={hasMore}
        refreshing={refreshing}
        onRefresh={refresh}
        onLoadMore={loadMore}
        onNewsPress={handleNewsPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    letterSpacing: -1,
  },
});

export default HomeScreen; 