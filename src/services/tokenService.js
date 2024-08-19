import { refreshToken } from './apiService';

const tokenService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refreshAccessToken: async () => {
    try {
      const _refreshToken = tokenService.getRefreshToken();
      const response = await refreshToken(_refreshToken);
      console.log('rf token', response);
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      tokenService.setTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (error) {
      tokenService.clearTokens();
      throw new Error('Failed to refresh access token');
    }
  },

  isAuthenticated: () => !!localStorage.getItem('accessToken'),
};

export default tokenService;
