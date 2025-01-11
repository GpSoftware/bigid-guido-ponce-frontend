import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentService } from '../../api/CommentService';
import { queryKeys } from '../../config/queryKeys';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: number) => CommentService.singleton.deleteComment(commentId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getArticles(), queryKeys.getComments(), queryKeys.getUsers()],
      });
    }
  })
}