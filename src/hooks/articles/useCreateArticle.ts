import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Article, CreateArticle } from '../../types/articles';
import { ArticleService } from '../../api/ArticleService';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (article: CreateArticle) => ArticleService.singleton.createArticle(article),
    onSuccess: async (data: Article) => {
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getArticles(), queryKeys.getUsers()],
      });

      queryClient.setQueryData(queryKeys.getArticle(Number(data.id)), () => (data));
    }
  })
}