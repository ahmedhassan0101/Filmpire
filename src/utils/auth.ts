// src/utils/auth.ts
import apiClient from '../api/client';
import type { AuthToken, SessionResponse } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  REQUEST_TOKEN: 'request_token',
  SESSION_ID: 'session_id',
  ACCOUNT_ID: 'account_id',
} as const;

// Auth utilities
export const authUtils = {
  // Get stored values
  getRequestToken: (): string | null => 
    localStorage.getItem(STORAGE_KEYS.REQUEST_TOKEN),
  
  getSessionId: (): string | null => 
    localStorage.getItem(STORAGE_KEYS.SESSION_ID),
  
  getAccountId: (): string | null => 
    localStorage.getItem(STORAGE_KEYS.ACCOUNT_ID),

  // Set stored values
  setRequestToken: (token: string): void => 
    localStorage.setItem(STORAGE_KEYS.REQUEST_TOKEN, token),
  
  setSessionId: (sessionId: string): void => 
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId),
  
  setAccountId: (accountId: string): void => 
    localStorage.setItem(STORAGE_KEYS.ACCOUNT_ID, accountId),

  // Clear auth data
  clearAuth: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => 
      localStorage.removeItem(key)
    );
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return Boolean(authUtils.getSessionId());
  },
};

// Auth API functions
export const fetchToken = async (): Promise<void> => {
  try {
    const response: AuthToken = await apiClient.get('/authentication/token/new');
    
    if (response.success) {
      authUtils.setRequestToken(response.request_token);
      
      // Redirect to TMDB authentication
      const redirectUrl = `${window.location.origin}/approved`;
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${redirectUrl}`;
    }
  } catch (error) {
    console.error('Failed to fetch token:', error);
    throw new Error('Could not create authentication token');
  }
};

export const createSessionId = async (): Promise<string> => {
  const token = authUtils.getRequestToken();
  
  if (!token) {
    throw new Error('No request token found');
  }

  try {
    const response: SessionResponse = await apiClient.post('/authentication/session/new', {
      request_token: token,
    });

    if (response.success) {
      authUtils.setSessionId(response.session_id);
      return response.session_id;
    }
    
    throw new Error('Failed to create session');
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
};