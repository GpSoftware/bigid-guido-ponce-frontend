import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { secondsToMilliseconds } from 'date-fns';
import { secondsInMinute } from 'date-fns/constants';
import { UserService } from '../../api/UserService';
import { User } from '../../types/users';

export const useUser = (id: number | undefined) => {
  return useQuery<User | null>({
    queryKey: queryKeys.getUser(id),
    queryFn: async () => {
      if (!id) return undefined;
      return UserService.singleton.getUser(id);
    },
    staleTime: secondsToMilliseconds(secondsInMinute * 15),
    enabled: Boolean(id),
  });
};