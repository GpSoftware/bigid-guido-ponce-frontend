import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { UserService } from '../../api/UserService';
import { UpdateUser, User } from '../../types/users';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, user }: {
      userId: number,
      user: UpdateUser
    }) => UserService.singleton.updateUser(userId, user),
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