import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { CreateOrganization, Organization } from '../../types/organizations';
import { OrganizationService } from '../../api/OrganizationService';

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organization: CreateOrganization) => OrganizationService.singleton.createOrganization(organization),
    onSuccess: async (data: Organization) => {
      await queryClient.refetchQueries({
        queryKey: queryKeys.getOrganizations(),
      });

      queryClient.setQueryData(queryKeys.getOrganization(Number(data.id)), () => (data));
    }
  })
}