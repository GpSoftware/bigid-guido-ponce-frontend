import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Article } from '../../types/articles';
import { ArticleService } from '../../api/ArticleService';

export const useArticles = () => {
  return useQuery<Article[]>({
    queryKey: queryKeys.getArticles(),
    queryFn: async () => ArticleService.singleton.getArticles(),
    staleTime: 0,
  });
};