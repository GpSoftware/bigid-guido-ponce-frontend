import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentService } from '../../api/CommentService';
import { CreateComment } from '../../types/comments';
import { queryKeys } from '../../config/queryKeys';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: CreateComment) => CommentService.singleton.createComment(comment),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [queryKeys.getArticles(), queryKeys.getComments(), queryKeys.getUsers()],
      });
    }
  })
}