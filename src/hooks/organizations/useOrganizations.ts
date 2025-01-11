import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../config/queryKeys';
import { Organization } from '../../types/organizations';
import { secondsToMilliseconds } from 'date-fns';
import { secondsInMinute } from 'date-fns/constants';
import { OrganizationService } from '../../api/OrganizationService';

export const useOrganizations = () => {
  return useQuery<Organization[]>({
    queryKey: queryKeys.getOrganizations(),
    queryFn: async () => OrganizationService.singleton.getOrganizations(),
    staleTime: secondsToMilliseconds(secondsInMinute * 15),
  });
};