import { ENVS } from '../config/env';
import axiosInstance from './fetcher';

export class AuthService {
  public static singleton = new AuthService();

  async signIn(email: string, password: string) {
    const response = await fetch(`${ENVS.API}/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Cannot sign in right now');
    }

    return result.result;
  }

  async signUp(email: string, username: string, organizationId: number, password: string) {
    const response = await fetch(`${ENVS.API}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, organizationId }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Cannot sign up right now');
    }

    return result.result;
  }

  async authenticate() {
    const { data } = await axiosInstance.post(`/auth/authenticate`);
    
    if (!data.success) {
      throw new Error(data.message || 'Unauthorized');
    }

    return data.result;
  }
}