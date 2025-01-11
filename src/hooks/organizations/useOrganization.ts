import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Organization } from '../../types/organizations';
import { secondsToMilliseconds } from 'date-fns';
import { secondsInMinute } from 'date-fns/constants';
import { OrganizationService } from '../../api/OrganizationService';

export const useOrganization = (id: number | undefined) => {
  return useQuery<Organization | null>({
    queryKey: queryKeys.getOrganization(id),
    queryFn: async () => {
      if (!id) return undefined;
      return OrganizationService.singleton.getOrganization(id)
    },
    staleTime: secondsToMilliseconds(secondsInMinute * 15),
    enabled: Boolean(id),
  });
};