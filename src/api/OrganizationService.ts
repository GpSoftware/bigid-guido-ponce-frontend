import { CreateOrganization, Organization } from '../types/organizations';
import axiosInstance from './fetcher';

export class OrganizationService {
  public static singleton = new OrganizationService();

  async getOrganizations() {
    const { data } = await axiosInstance.get('/organizations');
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get organizations');
    }
    
    return data.data.organizations;
  }

  async getOrganization(id: number) {
    const { data } = await axiosInstance.get(`/organizations/${id}`);
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get organization');
    }
    
    return data.data.organization;
  }

  async createOrganization(organization: CreateOrganization): Promise<Organization> {
    try {
      const { data } = await axiosInstance.post('/organizations', organization);

      if (!data.success) {
        throw new Error(data.message || 'Cannot create organization');
      }
  
      return data.data.organization;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async updateOrganization(organizationId: number, organizationName: string): Promise<Organization> {
    try {
      const { data } = await axiosInstance.patch(`/organizations/${organizationId}`, {
        name: organizationName
      });
  
      if (!data.success) {
        throw new Error(data.message || 'Cannot update organization');
      }
  
      return data.data.organization;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async deleteOrganization(organizationId: number) {
    try {
      const { data } = await axiosInstance.delete(`/organizations/${organizationId}`);
    
      if (!data.success) {
        throw new Error(data.message || 'Cannot get organizations');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }
}