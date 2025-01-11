import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { OrganizationService } from '../../api/OrganizationService';

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organizationId: number) => OrganizationService.singleton.deleteOrganization(organizationId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.getOrganizations(),
      });
    }
  })
}