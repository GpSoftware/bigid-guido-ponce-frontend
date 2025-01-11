import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentService } from '../../api/CommentService';
import { Comment, UpdateComment } from '../../types/comments';
import { queryKeys } from '../../config/queryKeys';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, comment }: {
      comment: UpdateComment,
      commentId: number,
    } ) => CommentService.singleton.updateComment(commentId, comment),
    onSuccess: async (data: Comment) => {
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getArticles(), queryKeys.getComments(), queryKeys.getUsers()],
      });

      await queryClient.setQueryData(queryKeys.getComment(Number(data.id)), () => ({
        ...data,
      }));
    }
  })
}