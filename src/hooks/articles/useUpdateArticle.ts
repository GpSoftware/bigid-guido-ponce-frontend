import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Article, UpdateArticle } from '../../types/articles';
import { ArticleService } from '../../api/ArticleService';
import { User } from '../../types/users';

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ articleId, article }: {
      article: UpdateArticle,
      articleId: number,
    }) => ArticleService.singleton.updateArticle(articleId, article),
    onSuccess: async (data: Article) => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.getArticles(),
      });

      queryClient.setQueryData(queryKeys.getArticle(Number(data.id)), () => (data));

      queryClient.setQueryData(queryKeys.getUsers(), (prev: User[]) => {
        return prev.map(user => {
          if (user.id === data.user_id) {
            return {
              ...user,
              amount_of_articles: Number(user.amount_of_articles) + 1,
            }
          }

          return user;
        })
      });
    }
  })
}