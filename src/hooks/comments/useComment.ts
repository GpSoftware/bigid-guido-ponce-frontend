import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { secondsToMilliseconds } from 'date-fns';
import { secondsInMinute } from 'date-fns/constants';
import { Comment } from '../../types/comments';
import { CommentService } from '../../api/CommentService';

export const useComment = (id: number | undefined) => {
  return useQuery<Comment>({
    queryKey: queryKeys.getComment(id),
    queryFn: async () => {
      if (!id) return undefined;
      return CommentService.singleton.getComment(id);
    },
    staleTime: secondsToMilliseconds(secondsInMinute * 15),
    enabled: Boolean(id),
  });
};