import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { User } from '../../types/users';
import { UserService } from '../../api/UserService';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: queryKeys.getUsers(),
    queryFn: async () => UserService.singleton.getUsers(),
    staleTime: 0,
  });
};