import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Comment } from '../../types/comments';
import { CommentService } from '../../api/CommentService';

export const useComments = () => {
  return useQuery<Comment[]>({
    queryKey: queryKeys.getComments(),
    queryFn: async () => CommentService.singleton.getComments(),
    staleTime: 0,
  });
};