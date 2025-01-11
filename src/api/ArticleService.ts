import { Article, CreateArticle, UpdateArticle } from '../types/articles';
import axiosInstance from './fetcher';

export class ArticleService {
  public static singleton = new ArticleService();

  async getArticles() {
    const { data } = await axiosInstance.get('/articles');
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get articles');
    }
    
    return data.data.articles;
  }

  async deleteArticle(articleId: number) {
    try {
      const { data } = await axiosInstance.delete(`/articles/${articleId}`);
    
      if (!data.success) {
        throw new Error(data.message || 'Cannot get article');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async getArticle(id: number) {
    const { data } = await axiosInstance.get(`/articles/${id}`);
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get article');
    }
    
    return data.data.article;
  }

  async createArticle(article: CreateArticle): Promise<Article> {
    try {
      const { data } = await axiosInstance.post('/articles', article);

      if (!data.success) {
        throw new Error(data.message || 'Cannot create article');
      }

      return data.data.article;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async updateArticle(articleId: number, article: UpdateArticle): Promise<Article> {
    try {
      const { data } = await axiosInstance.patch(`/articles/${articleId}`, article);

      if (!data.success) {
        throw new Error(data.message || 'Cannot update article');
      }

      return data.data.article;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }
}