import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

const NewsCard = ({ article, onPress }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLongPress = async () => {
    if (article.url) {
      try {
        await WebBrowser.openAuthSessionAsync(
          article.url,
          'redirect://'
        );
      } catch (error) {
        console.error('Error opening browser:', error);
      }
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="image-not-supported" size={40} color={theme.colors.text.light} />
          </View>
        )}
        <View style={styles.sourceTag}>
          <Text style={styles.sourceText} numberOfLines={1}>
            {article.source?.name || 'Unknown Source'}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="access-time" size={16} color={theme.colors.text.light} />
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
          <TouchableOpacity style={styles.readMoreButton} onPress={onPress}>
            <Text style={styles.readMoreText}>Read More</Text>
            <MaterialIcons name="arrow-forward" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  placeholderImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  sourceTag: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  sourceText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: theme.colors.text.light,
    marginLeft: theme.spacing.xs,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.primary}10`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  readMoreText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginRight: theme.spacing.xs,
  },
});

export default NewsCard; 