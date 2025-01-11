import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { UserService } from '../../api/UserService';
import { CreateUser, User } from '../../types/users';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: CreateUser) => UserService.singleton.createUser(user),
    onSuccess: async (data: User) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getOrganizations(),
      });

      await queryClient.refetchQueries({
        queryKey: queryKeys.getUsers(),
      });

      await queryClient.setQueryData(queryKeys.getUser(Number(data.id)), () => (data));
    }
  })
}