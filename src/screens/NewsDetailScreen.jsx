import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Linking 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { theme } from '../utils/theme';

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params;

  const handleOpenLink = async () => {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage ? (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <MaterialIcons name="image-not-supported" size={60} color="#666" />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.source}>{article.source?.name}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.content}>{article.content}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.linkButton, styles.inAppButton]} 
            onPress={handleOpenLink}
          >
            <Text style={styles.linkButtonText}>Open in App Browser</Text>
            <MaterialIcons name="open-in-new" size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton} 
            onPress={() => Linking.openURL(article.url)}
          >
            <Text style={styles.linkButtonText}>Open in External Browser</Text>
            <MaterialIcons name="launch" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: theme.spacing.lg,
  },
  placeholderImage: {
    width: '100%',
    height: 300,
    marginBottom: theme.spacing.lg,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  source: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    lineHeight: 32,
  },
  date: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xl,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.primary,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  content: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 2,
    gap: theme.spacing.md,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: theme.borderRadius.md,
  },
  inAppButton: {
    backgroundColor: `${theme.colors.secondary}10`,
  },
  linkButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginRight: theme.spacing.md,
  },
});

export default NewsDetailScreen; 