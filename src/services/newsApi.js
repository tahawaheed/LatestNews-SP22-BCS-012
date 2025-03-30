import axios from 'axios';
import { API_KEY, BASE_URL, ARTICLES_PER_PAGE } from '../utils/constants';

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const fetchNews = async (page = 1) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        country: 'us',
        pageSize: ARTICLES_PER_PAGE,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (query, page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        pageSize: ARTICLES_PER_PAGE,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}; 