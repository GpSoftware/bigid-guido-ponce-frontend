import { CreateUser, UpdateUser } from '../types/users';
import axiosInstance from './fetcher';

export class UserService {
  public static singleton = new UserService();

  async getUsers() {
    const { data } = await axiosInstance.get('/users');
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get users');
    }
    
    return data.data.users;
  }

  async deleteUser(userId: number) {
    try {
      const { data } = await axiosInstance.delete(`/users/${userId}`);
    
      if (!data.success) {
        throw new Error(data.message || 'Cannot delete user');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async getUser(id: number) {
    const { data } = await axiosInstance.get(`/users/${id}`);
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get user');
    }
    
    return data.data.user;
  }

  async createUser(user: CreateUser) {
    try {
      const { data } = await axiosInstance.post('/users', user);

      if (!data.success) {
        throw new Error(data.message || 'Cannot create user');
      }
  
      return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async updateUser(userId: number, user: UpdateUser) {
    try {
      const { data } = await axiosInstance.patch(`/users/${userId}`, user);

      if (!data.success) {
        throw new Error(data.message || 'Cannot update user');
      }
  
      return data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }
}