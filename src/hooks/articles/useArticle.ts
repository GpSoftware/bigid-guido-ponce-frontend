import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { secondsToMilliseconds } from 'date-fns';
import { secondsInMinute } from 'date-fns/constants';
import { Article } from '../../types/articles';
import { ArticleService } from '../../api/ArticleService';

export const useArticle = (id: number | undefined) => {
  return useQuery<Article | null>({
    queryKey: queryKeys.getArticle(id),
    queryFn: async () => {
      if (!id) return undefined;
      return ArticleService.singleton.getArticle(id);
    },
    staleTime: secondsToMilliseconds(secondsInMinute * 15),
    enabled: Boolean(id),
  });
};