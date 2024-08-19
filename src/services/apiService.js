import axios from 'axios';
import tokenService from './tokenService';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5150/api'; // Replace with your API URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Set request timeout (5 seconds)
});

api.interceptors.request.use(
  async (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await tokenService.refreshAccessToken();
        // Set the new token for the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        tokenService.clearTokens();
        toast.error('Session expired. Please log in again.');

        if (window.location.pathname !== '/login') {
          window.location.href = `/login?redirect_to=${window.location.pathname}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getUserData = async () => {
  const response = await api.get('/User');
  return response.data;
};

export const getUserPlaylists = async () => {
  const response = await api.get('/Playlist');
  return response.data;
};

export const register = (data) => api.post('/Auth/register', data);
export const login = (data) => api.post('/Auth/login', data);
export const refreshToken = (data) => api.post('/auth/refresh-token', data);
export const getPlaylistTracksById = (id) => api.get(`/Playlist/${id}`);
export const getArtistInfo = (id) => api.get(`/Artist/${id}`);
export const createPlaylist = (formData) => api.post('/Playlist', formData);
export const updatePlaylist = (id, formData) =>
  api.patch(`/Playlist/${id}`, formData);
export const getAlbumInfo = (id) => api.get(`/Album/${id}`);
export const searchByQuery = (query) =>
  api.get(`/Search`, { params: { query } });
export const getTrackInfo = (id) => api.get(`/Track/${id}`);
export const getMyArtists = () => api.get('/Home/my_artists');
export const getPopularArtists = () => api.get('/Home/popular_artists');
export const deletePlaylists = (id) => api.delete(`/Playlist/${id}`);
export const checkTrackExistInMyPlaylist = (id) =>
  api.get(`/Track/checkInPlaylist/${id}`);
export const addTrackToPlaylist = (pid, id) =>
  api.post(`/Playlist/${pid}/${id}`);
export const deleteTrackFromPlaylist = (pid, id) =>
  api.delete(`/Playlist/${pid}/${id}`);

export const getRcmTracks = (pid) => api.get(`/Playlist/rcm/${pid}`);
export default api;
