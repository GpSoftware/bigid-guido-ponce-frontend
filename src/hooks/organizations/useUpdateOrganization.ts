import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Organization } from '../../types/organizations';
import { OrganizationService } from '../../api/OrganizationService';

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ organizationId, organizationName }: {
      organizationId: number,
      organizationName: string
    }) => OrganizationService.singleton.updateOrganization(organizationId, organizationName),
    onSuccess: async (data: Organization) => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.getOrganizations(),
      });

      queryClient.setQueryData(queryKeys.getOrganization(Number(data.id)), () => (data));
    }
  })
}