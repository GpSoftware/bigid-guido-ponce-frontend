import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { UserService } from '../../api/UserService';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: number) => UserService.singleton.deleteUser(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.getOrganizations(),
      });

      await queryClient.refetchQueries({
        queryKey: queryKeys.getUsers(),
      });
    }
  })
}