import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { ArticleService } from '../../api/ArticleService';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (articleId: number) => ArticleService.singleton.deleteArticle(articleId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getArticles(), queryKeys.getComments(), queryKeys.getUsers()],
      });
    }
  })
}